import { CreateUserDto } from "src/user/interfaces/dtos/create-user.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
    createUser(createUserDto: CreateUserDto): Promise<User>;
}