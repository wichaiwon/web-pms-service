import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";

@Injectable()
export class GetEmployeeByUsernameUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeService: IEmployeeRepository,
    ) { }
    async execute(username: string): Promise<EmployeeDto | null> {
        const existingEmployee = await this.employeeService.findByUsername(username);
        if (!existingEmployee) {
            throw new NotFoundException(`Employee with username ${username} not found`);
        }
        return existingEmployee;
    }
}
