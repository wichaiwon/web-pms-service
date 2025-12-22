import { IsString, IsNotEmpty, IsEnum, IsOptional, MinLength, MaxLength, IsEmail, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Branch, EmployeeRole } from 'src/shared/enum/employee/employee.enum'


export class CreateEmployeeDto {
  @ApiProperty({ 
    example: '6805018',
    description: 'PKG member ID'
  })
  @IsNotEmpty({ message: 'pkg_id_member is required' })
  @IsString({ message: 'pkg_id_member must be a string' })
  @MinLength(1, { message: 'pkg_id_member must not be empty' })
  @MaxLength(50, { message: 'pkg_id_member must not exceed 50 characters' })
  pkg_id_member: string

  @ApiProperty({ 
    example: '405680518',
    description: 'Mirai ID (unique identifier)'
  })
  @IsNotEmpty({ message: 'mirai_id is required' })
  @IsString({ message: 'mirai_id must be a string' })
  @MinLength(1, { message: 'mirai_id must not be empty' })
  @MaxLength(50, { message: 'mirai_id must not exceed 50 characters' })
  mirai_id: string

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
    description: 'Password (minimum 6 characters)',
    minLength: 6
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @MaxLength(100, { message: 'password must not exceed 100 characters' })
  password: string

  @ApiProperty({ 
    example: '1234567890',
    description: 'Mirai password',
    minLength: 1
  })
  @IsNotEmpty({ message: 'mirai_password is required' })
  @IsString({ message: 'mirai_password must be a string' })
  @MinLength(1, { message: 'mirai_password must not be empty' })
  @MaxLength(100, { message: 'mirai_password must not exceed 100 characters' })
  mirai_password: string

  @ApiProperty({ 
    example: 'วิชัย',
    description: 'First name'
  })
  @IsNotEmpty({ message: 'firstname is required' })
  @IsString({ message: 'firstname must be a string' })
  @MinLength(1, { message: 'firstname must not be empty' })
  @MaxLength(100, { message: 'firstname must not exceed 100 characters' })
  firstname: string

  @ApiProperty({ 
    example: 'วงค์ฟู',
    description: 'Last name'
  })
  @IsNotEmpty({ message: 'lastname is required' })
  @IsString({ message: 'lastname must be a string' })
  @MinLength(1, { message: 'lastname must not be empty' })
  @MaxLength(100, { message: 'lastname must not exceed 100 characters' })
  lastname: string

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

  @ApiProperty({ 
    example: EmployeeRole.ADMIN, 
    enum: EmployeeRole, 
    default: EmployeeRole.ADMIN,
    description: 'Employee role',
    required: false
  })
  @IsOptional()
  @IsEnum(EmployeeRole, { message: `role must be one of: ${Object.values(EmployeeRole).join(', ')}` })
  role?: EmployeeRole

  @ApiProperty({ 
    example: Branch.HEAD_OFFICE, 
    enum: Branch, 
    default: Branch.HEAD_OFFICE,
    description: 'Branch location',
    required: false
  })
  @IsOptional()
  @IsEnum(Branch, { message: `branch must be one of: ${Object.values(Branch).join(', ')}` })
  branch?: Branch

  @ApiProperty({
    example: 'system',
    description: 'Created by user ID or system name',
    required: false,
    default: 'system'
  })
  @IsOptional()
  @IsString({ message: 'created_by must be a string' })
  created_by?: string
}
