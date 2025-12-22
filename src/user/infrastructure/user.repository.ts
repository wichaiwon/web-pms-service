import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/user.repository.interface';
import { CreateUserDto } from 'src/user/interfaces/dtos/create-user.dto';
import { Repository } from 'typeorm';
// import { IUserRepository } from 'src/domain/interfaces/user-repository.interface'; // ถ้ามี

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }
}