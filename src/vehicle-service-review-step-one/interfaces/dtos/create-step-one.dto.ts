import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { DamageCar } from "src/shared/enum/vehicle-service-review-step-one/step-one.enum";

export class CreateStepOneDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Vehicle Service Review ID' })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_id: string;

    @ApiProperty({ example: 'session_12345', description: 'Session ID', required: false })
    @IsOptional()
    session_id?: string;

    @ApiProperty({ example: DamageCar.NONE, description: 'Damage Car Enum Value', required: false, enum: DamageCar })
    @IsOptional()
    damage_car?: DamageCar;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'Damage Car Image URL', required: false })
    @IsOptional()
    damage_car_image?: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Created By User ID' })
    @IsNotEmpty()
    @IsUUID()
    created_by: string;
    // removed success_flag, is_active, created_by (not allowed in create dto)

}
