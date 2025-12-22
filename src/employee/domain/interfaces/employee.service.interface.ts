import { Employee } from "src/employee/domain/entities/employee.entity";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";

export interface IEmployeeService {
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
}
