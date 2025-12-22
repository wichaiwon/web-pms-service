import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { Employee } from "../entities/employee.entity";

export interface IEmployeeRepository {
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findByUsername(username: string): Promise<Employee | null>;
}
