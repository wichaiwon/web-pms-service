import { Employee } from "src/employee/domain/entities/employee.entity";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";

export interface IEmployeeService {
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    login(username: string, password: string): Promise<TokenDto | null>;
}
