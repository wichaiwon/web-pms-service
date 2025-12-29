import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateStepTwoAdditionalDto {
    
    @ApiProperty({ isArray: true, type: String, example: ['https://image4.com'] })
    @IsOptional()
    left_front_tire_image: string[];

    @ApiProperty({ isArray: true, type: String, example: ['https://image3.com'] })
    @IsOptional()
    right_front_tire_image: string[];

    @ApiProperty({ isArray: true, type: String, example: ['https://image2.com'] })
    @IsOptional()
    left_back_tire_image: string[];

    @ApiProperty({ isArray: true, type: String, example: ['https://image1.com'] })
    @IsOptional()
    right_back_tire_image: string[];

    @ApiProperty({ example: 'ยางสภาพดี' })
    @IsOptional()
    comment: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    updated_by: string;
}
