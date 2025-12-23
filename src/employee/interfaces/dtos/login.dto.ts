import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '405680518',
    description: 'Mirai ID or Email',
  })
  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'username must be a string' })
  @MinLength(1, { message: 'username must not be empty' })
  @MaxLength(50, { message: 'username must not exceed 50 characters' })
  username: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Password',
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(1, { message: 'password must not be empty' })
  @MaxLength(100, { message: 'password must not exceed 100 characters' })
  password: string;
}
