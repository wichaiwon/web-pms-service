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
    
    async findByUsername(username: string): Promise<Employee | null> {
        return this.employeeRepository.findOne({ 
            where: [
                { mirai_id: username },
                { pkg_id_member: username },
                { email: username }
            ]
        });
    }
}
