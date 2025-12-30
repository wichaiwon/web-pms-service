import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateStepTwoAdditionalDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_step_two_id: string;

    @ApiProperty({isArray: true, type: String, example: ['550e8400-e29b-41d4-a716-446655440000']})
    @IsOptional()
    left_front_tire_image?: string[];

    @ApiProperty({isArray: true, type: String, example: ['550e8400-e29b-41d4-a716-446655440000']})
    @IsOptional()
    right_front_tire_image?: string[];
    @ApiProperty({isArray: true, type: String, example: ['550e8400-e29b-41d4-a716-446655440000']})
    @IsOptional()
    left_back_tire_image?: string[];

    @ApiProperty({isArray: true, type: String, example: ['550e8400-e29b-41d4-a716-446655440000']})
    @IsOptional()
    right_back_tire_image?: string[];
    @ApiProperty({ example: 'ยางสภาพดี' })
    @IsOptional()
    comment?: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    created_by: string;
}
