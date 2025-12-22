import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./interfaces/controllers/user.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./infrastructure/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }
        )
    ],
    controllers: [UserController],
    providers: [UserService,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        }
    ],
    exports: [UserService],
})
export class UserModule { }