import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";
import type { IEmployeeService } from "../domain/interfaces/employee.service.interface";
import { CreateEmployeeUseCase } from "./commands/create-employee.use-case";
import { CreateEmployeesUseCase } from "./commands/create-employees.use-case";
import { LoginUseCase } from "./commands/login.use-case";
import { GetEmployeeByFullNameUseCase } from "./queries/get-employee-by-fullname.use-case";
import { GetEmployeesUseCase } from "./queries/get-employees.use-case";
import { GetEmployeeUseCase } from "./queries/get-employee.use-case";
import { UpdateEmployeeUseCase } from "./commands/update-employee.use-case";
import { UpdateEmployeeDto } from "../interfaces/dtos/update-employee.dto";

/**
 * EmployeeService - Application Service
 * 
 * หน้าที่: เป็นตัวประสานงาน (Orchestrator) ระหว่าง Controller และ Use Cases
 * - ไม่มี business logic ซับซ้อน แค่เรียกใช้ use-case ที่เหมาะสม
 * - รวม use-case หลายๆ ตัวไว้ในที่เดียว ให้ controller เรียกใช้ง่าย
 * - ทำหน้าที่เป็น Facade Pattern สำหรับ employee domain
 * 
 * ในกรณีที่มี business logic ซับซ้อน (เช่น ต้องเรียก use-case หลายตัว หรือมี validation พิเศษ)
 * ก็สามารถเพิ่ม logic ใน service นี้ได้
 */
@Injectable()
export class EmployeeService implements IEmployeeService {
    constructor(
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
        private readonly createEmployeeUseCase: CreateEmployeeUseCase,
        private readonly createEmployeesUseCase: CreateEmployeesUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly getEmployeeUseCase: GetEmployeeUseCase,
        private readonly getEmployeesUseCase: GetEmployeesUseCase,
        private readonly getEmployeeByFullNameUseCase: GetEmployeeByFullNameUseCase,
    ) { }

    /**
     * อัพเดทข้อมูลพนักงาน
     */
    async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDto> {
        return this.updateEmployeeUseCase.execute(id, updateEmployeeDto)
    }

    /**
     * สร้างพนักงานคนเดียว
     */
    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDto> {
        return this.createEmployeeUseCase.execute(createEmployeeDto);
    }

    /**
     * สร้างพนักงานหลายคน (Bulk create)
     */
    async createEmployees(createEmployeeDtos: CreateEmployeeDto[]): Promise<EmployeeDto[]> {
        return this.createEmployeesUseCase.execute(createEmployeeDtos);
    }

    /**
     * Login และได้ JWT token กลับมา
     */
    async login(username: string, password: string): Promise<TokenDto | null> {
        return this.loginUseCase.execute(username, password);
    }

    /**
     * ดึงข้อมูลพนักงานด้วย ID
     */
    async getEmployee(id: string): Promise<EmployeeDto> {
        return this.getEmployeeUseCase.execute(id);
    }

    /**
     * ดึงรายการพนักงานทั้งหมด
     */
    async getEmployees(): Promise<EmployeeDto[]> {
        return this.getEmployeesUseCase.execute();
    }

    /**
     * ค้นหาพนักงานด้วยชื่อ-นามสกุล
     */
    async getEmployeeByFullName(firstname: string, lastname: string): Promise<EmployeeDto | null> {
        return this.getEmployeeByFullNameUseCase.execute(firstname, lastname);
    }
}
