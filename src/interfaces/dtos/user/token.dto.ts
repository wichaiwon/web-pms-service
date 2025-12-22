import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGc...' })
  access_token: string;

  @ApiProperty({ example: 3600, required: false })
  expires_in?: number;

  @ApiProperty({ type: () => UserDto, required: false })
  user?: UserDto;
}