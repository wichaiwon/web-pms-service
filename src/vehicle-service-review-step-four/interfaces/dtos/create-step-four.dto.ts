import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { SignatureStatus } from "src/shared/enum/vehicle-service-review-step-four/step-four.enum";

export class CreateStepfourDto {
    @ApiProperty({
        description: 'Vehicle Service Review ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_id: string;

    @ApiProperty({
        description: 'image string of Customer Signature',
        example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    })
    @IsOptional()
    signature_customer?: string;

    @ApiProperty({
        description: 'Status of Customer Signature',
        example: SignatureStatus.SIGNED,
        enum: SignatureStatus,
    })
    @IsOptional()
    signature_status?: SignatureStatus;

    @ApiProperty({
        description: 'Customer Absent Flag',
        example: null,
    })
    @IsOptional()
    customer_absent_flag?: boolean;

    @ApiProperty({
        description: 'Created By',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsNotEmpty()
    @IsUUID()
    created_by: string;
}
