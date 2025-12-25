import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Employee } from "./domain/entities/employee.entity";
import { PassportModule } from "@nestjs/passport";
import { EmployeeController } from "./interfaces/controllers/employee.controller";
import { EmployeeService } from "./application/employee.service";
import { EmployeeRepository } from "./infrastructure/repositories/employee.repository";
import { JwtStrategy } from "./infrastructure/services/jwt.strategy";
import { CreateEmployeeUseCase } from "./application/commands/create-employee.use-case";
import { CreateEmployeesUseCase } from "./application/commands/create-employees.use-case";
import { LoginUseCase } from "./application/commands/login.use-case";
import { BcryptPasswordHasher } from "./infrastructure/services/password-hasher.service";
import { GetEmployeeUseCase } from "./application/queries/get-employee.use-case";
import { GetEmployeesUseCase } from "./application/queries/get-employees.use-case";
import { GetEmployeeByFullNameUseCase } from "./application/queries/get-employee-by-fullname.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET') || 'defaultSecretKey',
                signOptions: { expiresIn: '12h' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [EmployeeController],
    providers: [
        // Application Service (Orchestrator)
        EmployeeService,
        
        // Infrastructure
        JwtStrategy,
        
        // Use Cases - Commands
        CreateEmployeeUseCase,
        CreateEmployeesUseCase,
        LoginUseCase,
        
        // Use Cases - Queries
        GetEmployeeUseCase,
        GetEmployeesUseCase,
        GetEmployeeByFullNameUseCase,
        
        // Repository
        {
            provide: 'IEmployeeRepository',
            useClass: EmployeeRepository,
        },
        
        // Infrastructure Services
        {
            provide: 'IPasswordHasher',
            useClass: BcryptPasswordHasher,
        }
    ],
    exports: [EmployeeService],
})
export class EmployeeModule { }
