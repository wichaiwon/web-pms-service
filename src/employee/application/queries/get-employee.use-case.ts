
import { Inject, Injectable } from "@nestjs/common";
import { Employee } from "src/employee/domain/entities/employee.entity";
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
        return this.mapToEmployeeDto(employee);
    }
    private mapToEmployeeDto(employee: Employee): EmployeeDto {
        return {
            id: employee.id,
            pkg_id_member: employee.pkg_id_member,
            mirai_id: employee.mirai_id,
            email: employee.email,
            firstname: employee.firstname,
            lastname: employee.lastname,
            role: employee.role,
            branch: employee.branch,
            created_at: employee.created_at,
            mirai_password_updated_at: employee.mirai_password_updated_at,
            updated_at: employee.updated_at,
        }
    }
}
