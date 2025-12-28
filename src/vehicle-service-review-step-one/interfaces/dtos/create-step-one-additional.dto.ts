import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateStepOneAdditionalDto {
  @ApiProperty({ 
    description: 'Task detail step one ID that this additional service belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  vehicle_service_review_step_one_id: string

  @ApiPropertyOptional({ 
    description: 'Session ID for tracking create/update flow',
    example: 'session-123-456' 
  })
  @IsOptional()
  @IsString()
  session_id?: string

  @ApiPropertyOptional({ 
    description: 'Array of additional image URLs or base64 strings',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  additional_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Additional comments or notes for step one',
    example: 'พบรอยขีดข่วนเล็กน้อยที่กันชน' 
  })
  @IsOptional()
  @IsString()
  comment?: string

  @ApiProperty({ 
    description: 'ID of the user who created this additional step one entry',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
