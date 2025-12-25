import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer';
import { Branch, EmployeeRole } from 'src/shared/enum/employee/employee.enum'

export class EmployeeDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  pkg_id_member: string;

  @Expose()
  @ApiProperty()
  mirai_id: string;

  @Expose()
  @ApiProperty()
  pin_code: string;

  @Expose()
  @ApiProperty()
  mirai_password: string;

  @Expose()
  @ApiProperty()
  mirai_password_updated_at: Date;

  @Expose()
  @ApiProperty({ required: false })
  email?: string;

  @Expose()
  @ApiProperty()
  firstname: string;

  @Expose()
  @ApiProperty()
  lastname: string;

  @Expose()
  @ApiProperty({ enum: EmployeeRole })
  role: EmployeeRole;

  @Expose()
  @ApiProperty({ enum: Branch })
  branch: Branch;

  @Expose()
  @ApiProperty()
  created_by: string;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty({ required: false })
  updated_by: string;

  @Expose()
  @ApiProperty({ required: false })
  updated_at: Date;

  // **ไม่มี password และ field sensitive**
}
