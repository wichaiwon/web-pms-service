import { Users } from "src/user/domain/entities/user.entity";
import { CreateUserDto } from "src/user/interfaces/dtos/create-user.dto";

export interface IUserService {
    createUser(createUserDto: CreateUserDto): Promise<Users>;
}
