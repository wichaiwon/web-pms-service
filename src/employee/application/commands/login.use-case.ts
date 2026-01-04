import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import type { IPasswordHasher } from "src/employee/infrastructure/services/password-hasher.service";
import { LoginDto } from "src/employee/interfaces/dtos/login.dto";
import { TokenDto } from "src/employee/interfaces/dtos/token.dto";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
        @Inject('IPasswordHasher')
        private readonly passwordHasher: IPasswordHasher,
        private readonly jwtService: JwtService,
    ) { }

    async execute(loginDto: LoginDto): Promise<TokenDto | null> {
        const employee = await this.employeeRepository.findByUsername(loginDto.username);

        if (!employee) {
            return null;
        }

        const isPasswordValid = await this.passwordHasher.compare(loginDto.password, employee.password);

        if (!isPasswordValid) {
            return null;
        }

        const payload = {
            sub: employee.id,
            mirai_id: employee.mirai_id,
            pkg_id_member: employee.pkg_id_member,
            email: employee.email,
            role: employee.role,
        };

        return {
            id: employee.id,
            username: employee.mirai_id || employee.pkg_id_member || employee.email,
            branch: employee.branch,
            access_token: this.jwtService.sign(payload),
        };
    }
}
