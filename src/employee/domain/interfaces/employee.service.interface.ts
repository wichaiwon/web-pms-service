import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";
import { Employee } from "../entities/employee.entity";

export interface IEmployeeService {
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDto>;
    createEmployees(createEmployeeDtos: CreateEmployeeDto[]): Promise<EmployeeDto[]>;
    login(username: string, password: string): Promise<TokenDto | null>;
    getEmployees(): Promise<EmployeeDto[]>;
    getEmployeeByFullName(firstname: string, lastname: string): Promise<EmployeeDto | null>;
}
