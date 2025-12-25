import { Inject, Injectable } from "@nestjs/common";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";

@Injectable()
export class GetEmployeeByFullNameUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
    ) { }

    async execute(firstname: string, lastname: string): Promise<EmployeeDto | null> {
        return this.employeeRepository.getEmployeeByFullName(firstname, lastname);
    }
}
