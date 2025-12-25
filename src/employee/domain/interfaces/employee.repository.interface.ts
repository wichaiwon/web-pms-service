import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { Employee } from "../entities/employee.entity";

export interface IEmployeeRepository {
    getEmployee(id: string): Promise<Employee>;
    getEmployees(): Promise<Employee[]>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    createEmployees(createEmployeeDtos: CreateEmployeeDto[]): Promise<Employee[]>;
    findByUsername(username: string): Promise<Employee>;
    getEmployeeByFullName(firstname: string, lastname: string): Promise<Employee | null>;
}
