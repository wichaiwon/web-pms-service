import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { DamageCar } from "src/shared/enum/vehicle-service-review-step-one/step-one.enum";

export class UpdateStepOneDto {
    @ApiProperty({ example: DamageCar.CANNOT_CHECK, description: 'Damage car status',enum: DamageCar })
    @IsOptional()
    damage_car: DamageCar;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Damage car image URL' })
    @IsOptional()
    damage_car_image: string;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Vehicle service review ID' })
    @IsNotEmpty()
    @IsUUID()
    updated_by: string;
}
