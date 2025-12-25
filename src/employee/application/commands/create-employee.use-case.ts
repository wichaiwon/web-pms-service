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
    ) { }
    async execute(createDto: CreateEmployeeDto): Promise<EmployeeDto> {
        const hashedPassword = await this.passwordHasher.hash(createDto.password);
        const employee = await this.employeeRepository.createEmployee({
            ...createDto,
            password: hashedPassword,
        });
        return employee;
    }
    async executeMultiple(createDtos: CreateEmployeeDto[]): Promise<EmployeeDto[]> {
        const employeesToCreate = await Promise.all(createDtos.map(async (dto) => {
            const hashedPassword = await this.passwordHasher.hash(dto.password);
            return {
                ...dto,
                password: hashedPassword,
            };
        }));

        const employees = await this.employeeRepository.createEmployees(employeesToCreate);
        return employees;
    }

}
