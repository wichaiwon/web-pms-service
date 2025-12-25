import { Inject, Injectable } from "@nestjs/common";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import type { IPasswordHasher } from "src/employee/infrastructure/services/password-hasher.service";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";

@Injectable()
export class CreateEmployeesUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
        @Inject('IPasswordHasher')
        private readonly passwordHasher: IPasswordHasher,
    ) { }

    async execute(createEmployeeDtos: CreateEmployeeDto[]): Promise<EmployeeDto[]> {
        // Hash passwords for all employees
        const employeesWithHashedPasswords = await Promise.all(
            createEmployeeDtos.map(async (dto) => ({
                ...dto,
                password: await this.passwordHasher.hash(dto.password),
            }))
        );

        const employees = await this.employeeRepository.createEmployees(employeesWithHashedPasswords);
        
        return employees;
    }
}
