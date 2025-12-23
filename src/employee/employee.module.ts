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
import { BcryptPasswordHasher } from "./infrastructure/services/password-hasher.service";

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
        EmployeeService,
        JwtStrategy,
        CreateEmployeeUseCase,
        {
            provide: 'IEmployeeRepository',
            useClass: EmployeeRepository,
        },
        {
            provide: 'IPasswordHasher',
            useClass: BcryptPasswordHasher,
        }
    ],
    exports: [EmployeeService],
})
export class EmployeeModule { }
