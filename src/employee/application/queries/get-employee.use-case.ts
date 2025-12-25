import { Inject, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";

@Injectable()
export class GetEmployeeUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
    ) { }

    async execute(id: string): Promise<EmployeeDto> {
        const employee =  await this.employeeRepository.getEmployee(id);
        return plainToInstance(EmployeeDto, employee, { excludeExtraneousValues: true });
    }
    
}
