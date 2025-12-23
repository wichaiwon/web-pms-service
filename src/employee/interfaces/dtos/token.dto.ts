import { ApiProperty } from '@nestjs/swagger';
import { EmployeeDto } from './employee.dto';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGc...' })
  access_token: string;

  @ApiProperty({ example: 3600, required: false })
  expires_in?: number;

  @ApiProperty({ type: () => EmployeeDto, required: false })
  employee?: EmployeeDto;
}
