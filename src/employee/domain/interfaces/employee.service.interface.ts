import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { LoginDto } from "src/employee/interfaces/dtos/login.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";
import { UpdateEmployeeDto } from "src/employee/interfaces/dtos/update-employee.dto";

export interface IEmployeeService {
    getEmployees(): Promise<EmployeeDto[]>;
    getEmployeeByFullName(firstname: string, lastname: string): Promise<EmployeeDto | null>;
    findEmployeeByUsername(username: string): Promise<EmployeeDto | null>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDto>;
    createEmployees(createEmployeeDtos: CreateEmployeeDto[]): Promise<EmployeeDto[]>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDto>;
    login(loginDto: LoginDto): Promise<TokenDto | null>;
}
