import { Inject, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { UpdateEmployeeDto } from "src/employee/interfaces/dtos/update-employee.dto";

@Injectable()
export class UpdateEmployeeUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
    ) { }
    async execute(id: string, updateDto:UpdateEmployeeDto): Promise<EmployeeDto> {
        const employee = await this.employeeRepository.updateEmployee(id, updateDto);
        return plainToInstance(EmployeeDto, employee, { excludeExtraneousValues: true });
    }
}
