import { Body, Controller, Post, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { EmployeeService } from "src/employee/application/employee.service";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { LoginDto } from "../dtos/login.dto";
import { TokenDto } from "../dtos/token.dto";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";

@ApiTags('Authentication')
@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) { }
    
    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ 
        summary: 'Create new employee(s)', 
        description: 'Create one or multiple employees. Can accept a single employee object or an array of employee objects. Requires JWT authentication.' 
    })
    @ApiBody({
        type: CreateEmployeeDto,
        description: 'Employee data to create',
        examples: {
            single: {
                summary: 'Create single employee',
                value: {
                    pkg_id_member: '6805018',
                    mirai_id: '405680518',
                    email: 'wichai.wongfu.pkg@gmail.com',
                    password: '1234567890',
                    mirai_password: '1234567890',
                    firstname: 'วิชัย',
                    lastname: 'วงค์ฟู',
                    pin_code: '123456',
                    role: 'admin',
                    branch: 'สำนักงานใหญ่',
                    created_by: 'system'
                }
            },
            multiple: {
                summary: 'Create multiple employees',
                value: [
                    {
                        pkg_id_member: '6805018',
                        mirai_id: '405680518',
                        email: 'wichai.wongfu.pkg@gmail.com',
                        password: '1234567890',
                        mirai_password: '1234567890',
                        firstname: 'วิชัย',
                        lastname: 'วงค์ฟู',
                        pin_code: '123456',
                        role: 'admin',
                        branch: 'สำนักงานใหญ่',
                        created_by: 'system'
                    },
                    {
                        pkg_id_member: '6805019',
                        mirai_id: '405680519',
                        email: 'somchai.test@gmail.com',
                        password: '1234567890',
                        mirai_password: '1234567890',
                        firstname: 'สมชาย',
                        lastname: 'ทดสอบ',
                        pin_code: '654321',
                        role: 'mechanic',
                        branch: 'สอยดาว',
                        created_by: 'system'
                    }
                ]
            }
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Employee(s) created successfully',
        type: EmployeeDto
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad request - Invalid input data' 
    })
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto | CreateEmployeeDto[]): Promise<EmployeeDto | EmployeeDto[]> {
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Employee login', description: 'Login with username (mirai_id, pkg_id_member, or email) and password' })
    @ApiBody({ 
        type: LoginDto, 
        description: 'Login credentials',
        examples: {
            example1: {
                summary: 'Login example',
                value: {
                    username: '405680518',
                    password: '1234567890'
                }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Login successful', type: TokenDto })
    @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
    async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        const result = await this.employeeService.login(loginDto.username, loginDto.password);
        if (!result) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return result;
    }
}