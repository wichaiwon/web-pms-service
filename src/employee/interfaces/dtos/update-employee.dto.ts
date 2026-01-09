import { IsString, IsNotEmpty, IsEnum, IsOptional, MinLength, MaxLength, IsEmail, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Branch, EmployeeRole } from 'src/shared/enum/employee/employee.enum'


export class UpdateEmployeeDto {


  @ApiProperty({ 
    example: 'wichai.wongfu.pkg@gmail.com',
    description: 'Email address (optional)',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'email must be a valid email address' })
  @MaxLength(100, { message: 'email must not exceed 100 characters' })
  email?: string

  @ApiProperty({ 
    example: '1234567890',
    description: 'Mirai password',
    minLength: 1
  })
  @IsOptional()
  @IsString({ message: 'mirai_password must be a string' })
  @MinLength(1, { message: 'mirai_password must not be empty' })
  @MaxLength(100, { message: 'mirai_password must not exceed 100 characters' })
  mirai_password?: string

  @ApiProperty({ 
    example: 'วิชัย',
    description: 'First name'
  })
  @IsOptional()
  @IsString({ message: 'firstname must be a string' })
  @MinLength(1, { message: 'firstname must not be empty' })
  @MaxLength(100, { message: 'firstname must not exceed 100 characters' })
  firstname?: string

  @ApiProperty({ 
    example: 'วงค์ฟู',
    description: 'Last name'
  })
  @IsOptional()
  @IsString({ message: 'lastname must be a string' })
  @MinLength(1, { message: 'lastname must not be empty' })
  @MaxLength(100, { message: 'lastname must not exceed 100 characters' })
  lastname?: string

  @ApiProperty({ 
    example: '123456',
    description: 'PIN code (4-6 digits, optional)',
    required: false,
    minLength: 4,
    maxLength: 6
  })
  @IsOptional()
  @IsString({ message: 'pin_code must be a string' })
  @Matches(/^\d{4,6}$/, { message: 'pin_code must be between 4 and 6 digits' })
  pin_code?: string

  @IsOptional()
  @ApiProperty({
    example: Branch.HEAD_OFFICE,
    description: 'Branch of the employee',
    enum: Branch,
  })
  @IsEnum(Branch, { message: 'branch must be a valid Branch enum value' })
  branch?: Branch

  @ApiProperty({
    example: 'system',
    description: 'Updated by user ID or system name',
    required: false,
    default: 'system'
  })
  @IsNotEmpty()
  @IsString({ message: 'updated_by must be a string' })
  updated_by: string
}
