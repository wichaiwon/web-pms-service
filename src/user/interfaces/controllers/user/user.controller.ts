import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "src/user/application/user.service";
import { CreateUserDto } from "src/user/interfaces/dtos/create-user.dto";
import { UserDto } from "src/user/interfaces/dtos/user.dto";

@ApiTags('Authentication')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto | CreateUserDto[]): Promise<UserDto | UserDto[]> {
        const user = Array.isArray(createUserDto)
            ? await Promise.all(createUserDto.map(dto => this.userService.createUser(dto)))
            : await this.userService.createUser(createUserDto);
        return user;
    }
}

