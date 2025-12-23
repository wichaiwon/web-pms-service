import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { Employee } from "src/employee/domain/entities/employee.entity";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import { IEmployeeService } from "src/employee/domain/interfaces/employee.service.interface";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";
import { CreateEmployeeUseCase } from "./commands/create-employee.use-case";

@Injectable()
export class EmployeeService implements IEmployeeService {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
        private readonly jwtService: JwtService,
        private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    ) {}
    async createEmployee(createEmployeeDto: CreateEmployeeDto | CreateEmployeeDto[]): Promise<EmployeeDto | EmployeeDto[]> {
        return this.createEmployeeUseCase.execute(createEmployeeDto);
    }
    
    async login(username: string, password: string): Promise<TokenDto | null> {
        const employee = await this.employeeRepository.findByUsername(username);
        if (!employee) {
            return null;
        }
        
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return null;
        }
        
        const payload = { sub: employee.id, username: employee.mirai_id, role: employee.role };
        const access_token = await this.jwtService.signAsync(payload);
        
        return {
            access_token,
            expires_in: 43200, // 12 hours in seconds
            employee: {
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
        };
    }
}
