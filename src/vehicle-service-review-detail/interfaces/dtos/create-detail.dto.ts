import { IsNotEmpty, IsUUID, IsOptional, IsEnum, IsNumber, IsBoolean, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { FuelLevel } from 'src/shared/enum/vehicle-service-review-detail/detail.enum'

export class CreateDetailDto {
    @ApiProperty({ description: 'Vehicle Service Review ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_id: string

    @ApiPropertyOptional({ description: 'Session ID', example: 'session_12345' })
    @IsOptional()
    @IsString()
    session_id?: string

    @ApiPropertyOptional({ description: 'Image 1 URL', example: 'https://example.com/image1.jpg' })
    @IsOptional()
    @IsString()
    image1?: string

    @ApiPropertyOptional({ description: 'Image 2 URL', example: 'https://example.com/image2.jpg' })
    @IsOptional()
    @IsString()
    image2?: string

    @ApiPropertyOptional({ description: 'Mileage', example: 12345 })
    @IsOptional()
    @IsNumber()
    mileage?: number

    @ApiPropertyOptional({ description: 'Fuel Level', enum: FuelLevel, example: FuelLevel.LEVEL_20 })
    @IsOptional()
    @IsEnum(FuelLevel)
    fuel_level?: FuelLevel

    @ApiPropertyOptional({ description: 'Success Flag', default: false, example: true })
    @IsOptional()
    @IsBoolean()
    success_flag?: boolean

    @ApiProperty({ description: 'Created By User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    created_by: string
}
