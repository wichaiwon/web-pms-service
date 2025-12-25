import { Inject, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";

@Injectable()
export class GetEmployeesUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
    ) { }

    async execute(): Promise<EmployeeDto[]> {
        const employees =  await this.employeeRepository.getEmployees();
        return plainToInstance(EmployeeDto, employees, { excludeExtraneousValues: true });
    }
}