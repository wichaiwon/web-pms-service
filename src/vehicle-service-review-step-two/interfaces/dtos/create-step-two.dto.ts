import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { Cargo, SpareTire, TireCondition, TireDepth, TruckToolSet, WheelControlCover } from "src/shared/enum/vehicle-service-review-step-two/step-two.enum";

export class CreateStepTwoDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_id: string;

    @ApiProperty({ })
    @IsOptional()
    session_id?: string;

    @ApiProperty({ enum: SpareTire, example: SpareTire.HAVE })
    @IsOptional()
    spare_tire?: SpareTire;

    @ApiProperty({ enum: WheelControlCover, example: WheelControlCover.HAVE })
    @IsOptional()
    wheel_control_cover?: WheelControlCover;
    @ApiProperty({ enum: Cargo, example: Cargo.HAVE })
    @IsOptional()
    cargo?: Cargo;

    @ApiProperty({ enum: TruckToolSet, example: TruckToolSet.HAVE })
    @IsOptional()
    truck_tool_set?: TruckToolSet;
    @ApiProperty({ example: '25', description: 'ปีของยางล้อหน้าซ้าย' })
    @IsOptional()
    left_front_tire_year?: string;

    @ApiProperty({ example: '25', description: 'ปีของยางล้อหน้าขวา' })
    @IsOptional()
    right_front_tire_year?: string;
    @ApiProperty({ example: '25', description: 'ปีของยางล้อหลังซ้าย' })
    @IsOptional()
    left_back_tire_year?: string;

    @ApiProperty({ example: '25', description: 'ปีของยางล้อหลังขวา' })
    @IsOptional()
    right_back_tire_year?: string;
    @ApiProperty({ example: 32, description: 'ความดันลมยางล้อหน้าซ้าย' })
    @IsOptional()
    left_front_tire_pressure?: number;

    @ApiProperty({ example: 32, description: 'ความดันลมยางล้อหน้าขวา' })
    @IsOptional()
    right_front_tire_pressure?: number;
    @ApiProperty({ example: 32, description: 'ความดันลมยางล้อหลังซ้าย' })
    @IsOptional()
    left_back_tire_pressure?: number;

    @ApiProperty({ example: 32, description: 'ความดันลมยางล้อหลังขวา' })
    @IsOptional()
    right_back_tire_pressure?: number;
    @ApiProperty({ enum:TireDepth, example: TireDepth.EIGHT, description: 'ความลึกของดอกยางล้อหน้าซ้าย' })
    @IsOptional()
    left_front_tire_depth?: TireDepth;

    @ApiProperty({ enum:TireDepth, example: TireDepth.EIGHT, description: 'ความลึกของดอกยางล้อหน้าขวา' })
    @IsOptional()
    right_front_tire_depth?: TireDepth;
    @ApiProperty({ enum:TireDepth, example: TireDepth.EIGHT, description: 'ความลึกของดอกยางล้อหลังซ้าย' })
    @IsOptional()
    left_back_tire_depth?: TireDepth;

    @ApiProperty({ enum:TireDepth, example: TireDepth.EIGHT, description: 'ความลึกของดอกยางล้อหลังขวา' })
    @IsOptional()
    right_back_tire_depth?: TireDepth;
    @ApiProperty({enum:TireCondition, example: TireCondition.CHANGE_IMMEDIATELY, description: 'สภาพยางล้อหน้าซ้าย' })
    @IsOptional()
    left_front_tire_condition?: TireCondition;

    @ApiProperty({enum:TireCondition, example: TireCondition.CHANGE_IMMEDIATELY, description: 'สภาพยางล้อหน้าขวา' })
    @IsOptional()
    right_front_tire_condition?: TireCondition;
    @ApiProperty({enum:TireCondition, example: TireCondition.CHANGE_IMMEDIATELY, description: 'สภาพยางล้อหลังซ้าย' })
    @IsOptional()
    left_back_tire_condition?: TireCondition;

    @ApiProperty({enum:TireCondition, example: TireCondition.CHANGE_IMMEDIATELY, description: 'สภาพยางล้อหลังขวา' })
    @IsOptional()
    right_back_tire_condition?: TireCondition;
    
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty()
    @IsUUID()
    created_by: string;
}
