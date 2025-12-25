import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/domain/entities/employee.entity';
import { IEmployeeRepository } from 'src/employee/domain/interfaces/employee.repository.interface';
import { CreateEmployeeDto } from 'src/employee/interfaces/dtos/create-employee.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const newEmployee = this.employeeRepository.create(createEmployeeDto);
        return this.employeeRepository.save(newEmployee);
    }
    
    async findByUsername(username: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ 
            where: [
                { mirai_id: username },
                { pkg_id_member: username },
                { email: username }
            ]
        });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }

    async getEmployee(id: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { id } });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }

    async getEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    async getEmployeeByFullName(firstname: string, lastname: string): Promise<Employee | null> {
        const employee = await this.employeeRepository.findOne({
            where: {
                firstname: firstname,
                lastname: lastname
            }
        });
        return employee;
    }

    async createEmployees(createEmployeeDtos: CreateEmployeeDto[]): Promise<Employee[]> {
        const newEmployees = this.employeeRepository.create(createEmployeeDtos);
        return this.employeeRepository.save(newEmployees);
    }
}
