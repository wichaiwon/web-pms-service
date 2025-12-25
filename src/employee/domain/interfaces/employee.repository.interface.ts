import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { Employee } from "../entities/employee.entity";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { UpdateEmployeeDto } from "src/employee/interfaces/dtos/update-employee.dto";

export interface IEmployeeRepository {
    getEmployee(id: string): Promise<Employee>;
    getEmployees(): Promise<EmployeeDto[]>;
    findByUsername(username: string): Promise<Employee>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    createEmployees(createEmployeeDtos: CreateEmployeeDto[]): Promise<Employee[]>;
    updateEmployee(id: string, updateData: UpdateEmployeeDto): Promise<Employee>;
    getEmployeeByFullName(firstname: string, lastname: string): Promise<Employee | null>;
}
