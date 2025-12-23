import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";

export interface IEmployeeService {
    createEmployee(createEmployeeDto: CreateEmployeeDto | CreateEmployeeDto[]): Promise<EmployeeDto | EmployeeDto[]>;
    login(username: string, password: string): Promise<TokenDto | null>;
}
