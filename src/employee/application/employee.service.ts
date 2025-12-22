import { Inject, Injectable } from "@nestjs/common";
import { Employee } from "src/employee/domain/entities/employee.entity";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { IEmployeeService } from "src/employee/domain/interfaces/employee.service.interface";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService implements IEmployeeService {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
    ) {}
    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        createEmployeeDto.password = await bcrypt.hash(createEmployeeDto.password, 10);
        return this.employeeRepository.createEmployee(createEmployeeDto);
    }
}
