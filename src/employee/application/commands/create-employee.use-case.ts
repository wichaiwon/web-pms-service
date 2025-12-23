import { Inject, Injectable } from "@nestjs/common";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import type { IPasswordHasher } from "src/employee/infrastructure/services/password-hasher.service";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";

@Injectable()
export class CreateEmployeeUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
        @Inject('IPasswordHasher')
        private readonly passwordHasher: IPasswordHasher
    ) {}
    async execute(createDto:CreateEmployeeDto | CreateEmployeeDto[]): Promise<EmployeeDto | EmployeeDto[]> {
        if (Array.isArray(createDto)) {
            const employeesToCreate = await Promise.all(
                createDto.map(async (dto) => {
                    const hashedPassword = await this.passwordHasher.hash(dto.password);
                    return { ...dto, password: hashedPassword };
                })
            );
            return this.employeeRepository.createEmployees(employeesToCreate);
        } else {
            const hashedPassword = await this.passwordHasher.hash(createDto.password);
            const employeeToCreate = { ...createDto, password: hashedPassword };
            return this.employeeRepository.createEmployee(employeeToCreate);
        }
    }
    
}
