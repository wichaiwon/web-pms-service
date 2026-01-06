import { Body, Controller, Post, HttpException, HttpStatus, UseGuards, Get, Param, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { EmployeeService } from "src/employee/application/employee.service";
import { CreateEmployeeDto } from "src/employee/interfaces/dtos/create-employee.dto";
import { EmployeeDto } from "src/employee/interfaces/dtos/employee.dto";
import { LoginDto } from "../dtos/login.dto";
import { TokenDto } from "../dtos/token.dto";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";
import { UpdateEmployeeDto } from "../dtos/update-employee.dto";

@ApiTags('Authentication')
@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) { }
    
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
    async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        const result = await this.employeeService.login(loginDto);
        if (!result) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return result;
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get all employees', description: 'Retrieve a list of all employees' })
    async getAllEmployees(): Promise<EmployeeDto[]> {
        return this.employeeService.getEmployees();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get employee by ID', description: 'Retrieve an employee by their ID' })
    async getEmployee(@Param('id') id: string): Promise<EmployeeDto> {
        return this.employeeService.getEmployee(id);
    }

    @Get('username/:username')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get employee by username', description: 'Retrieve an employee by their username (mirai_id, pkg_id_member, or email)' })
    async findEmployeeByUsername(@Param('username') username: string): Promise<EmployeeDto | null> {
        return this.employeeService.findEmployeeByUsername(username);
    }

    @Get(':firstname/:lastname')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get employee by full name', description: 'Retrieve an employee by their first and last name' })
    async getEmployeeByFullName(@Param('firstname') firstname: string, @Param('lastname') lastname: string): Promise<EmployeeDto | null> {
        return this.employeeService.getEmployeeByFullName(firstname, lastname);
    }

    @Post('create')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('JWT-auth')
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
            }
        }
    })
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDto> {
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    @Post('create-multiple')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Create multiple employees',
        description: 'Create multiple employees by providing an array of employee objects. Requires JWT authentication.'
    })
    @ApiBody({
        type: [CreateEmployeeDto],
        description: 'Array of employee data to create',
        examples: {
            multiple: {
                summary: 'Create multiple employees',
                value: [
                    {
                        pkg_id_member: '6805019',
                        mirai_id: '405680519',
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
                        pkg_id_member: '6805020',
                        mirai_id: '405680520',
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
                ]
            }
        }
    })
    async createMultipleEmployees(@Body() createEmployeesDto: CreateEmployeeDto[]): Promise<EmployeeDto[]> {
        return this.employeeService.createEmployees(createEmployeesDto);
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update employee', description: 'Update an existing employee by ID', })
    @ApiBody({ type: UpdateEmployeeDto, description: 'Employee data to update' })
    async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDto> {
        return this.employeeService.updateEmployee(id, updateEmployeeDto);
    }
}