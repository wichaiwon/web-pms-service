import { Injectable } from "@nestjs/common";
import { Users } from "src/user/domain/entities/user.entity";
import type { IUserRepository } from "src/user/domain/interfaces/user.repository.interface";
import { IUserService } from "src/user/domain/interfaces/user.service.interface";
import { CreateUserDto } from "src/user/interfaces/dtos/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}
    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        return this.userRepository.createUser(createUserDto);
    }
}

