import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { TirePressure } from "src/shared/enum/vehicle-service-review-detail/detail.enum";

export class CreateDetailAdditionalDto {
    @ApiProperty({ description: 'Vehicle Service Review ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_detail_id: string

    @ApiProperty({ description: 'Session ID', example: 'session_12345' })
    @IsOptional()
    session_id: string

    @ApiProperty({ description: 'Tire Pressure Status', enum: TirePressure, example: TirePressure.NORMAL })
    @IsOptional()
    @IsEnum(TirePressure)
    tire_pressure: TirePressure

    @ApiProperty({ description: 'Front Tire Pressure', example: 35 })
    @IsOptional()
    front_tire_pressure: number

    @ApiProperty({ description: 'Back Tire Pressure', example: 40 })
    @IsOptional()
    back_tire_pressure: number

    @ApiProperty({ description: 'Comment', example: 'Tire pressure checked and adjusted.' })
    @IsOptional()
    comment: string

    @ApiProperty({ description: 'Created By User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    created_by: string
}
