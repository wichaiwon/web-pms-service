import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateDetailDto {
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
    mileage?: number;

    @ApiPropertyOptional({ description: 'Fuel Level', example: 3 })
    @IsOptional()
    @IsNumber()
    fuel_level?: number;

    @ApiProperty({})
    @IsNotEmpty()
    @IsUUID()
    updated_by: string;
}
