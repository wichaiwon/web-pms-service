import { ApiProperty } from '@nestjs/swagger';
import { EmployeeDto } from './employee.dto';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGc...' })
  access_token: string;

  @ApiProperty({ example: 3600, required: false })
  expires_in?: number;

  @ApiProperty({ type: () => EmployeeDto, required: false })
  employee?: EmployeeDto;

  @ApiProperty({ example: '405680518', description: 'Username', required: false })
  username?: string;

  @ApiProperty({ example: 'Bangkok', description: 'Branch', required: false })
  branch?: string;
}
