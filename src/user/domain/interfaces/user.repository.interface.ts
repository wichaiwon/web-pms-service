import { CreateUserDto } from "src/user/interfaces/dtos/create-user.dto";
import { Users } from "../entities/user.entity";

export interface IUserRepository {
    createUser(createUserDto: CreateUserDto): Promise<Users>;
}