import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./domain/entities/employee.entity";
import { PassportModule } from "@nestjs/passport";
import { EmployeeController } from "./interfaces/controllers/employee.controller";
import { EmployeeService } from "./application/employee.service";
import { EmployeeRepository } from "./infrastructure/employee.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee]),
        PassportModule.register({ defaultStrategy: 'jwt' }
        )
    ],
    controllers: [EmployeeController],
    providers: [EmployeeService,
        {
            provide: 'IEmployeeRepository',
            useClass: EmployeeRepository,
        }
    ],
    exports: [EmployeeService],
})
export class EmployeeModule { }
