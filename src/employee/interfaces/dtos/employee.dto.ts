import { ApiProperty } from '@nestjs/swagger'
import { Branch, EmployeeRole } from 'src/shared/enum/employee/employee.enum'

export class EmployeeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  pkg_id_member: string;

  @ApiProperty()
  mirai_id: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty({ enum: EmployeeRole })
  role: EmployeeRole;

  @ApiProperty({ enum: Branch })
  branch: Branch;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  mirai_password_updated_at: Date;

  @ApiProperty({ required: false })
  updated_at?: Date;
  
  // **ไม่มี password และ field sensitive**
}
