import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import type { IPasswordHasher } from "src/employee/infrastructure/services/password-hasher.service";
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

    async execute(username: string, password: string): Promise<TokenDto | null> {
        const employee = await this.employeeRepository.findByUsername(username);
        
        if (!employee) {
            return null;
        }

        const isPasswordValid = await this.passwordHasher.compare(password, employee.password);
        
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
            access_token: this.jwtService.sign(payload),
        };
    }
}
