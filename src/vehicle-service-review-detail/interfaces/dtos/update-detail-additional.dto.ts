import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { TirePressure } from "src/shared/enum/vehicle-service-review-detail/vehicle-service-review-detail.enum";

export class UpdateDetailAdditionalDto {

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

    @ApiProperty({ description: 'Updated By User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsOptional()
    @IsUUID()
    updated_by: string
}
