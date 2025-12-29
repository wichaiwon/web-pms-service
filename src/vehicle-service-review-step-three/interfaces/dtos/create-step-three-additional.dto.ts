import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateStepThreeAdditionalDto {
    @ApiProperty({
        description: 'Vehicle Service Review ID',
        example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    })
    @IsNotEmpty()
    @IsUUID()
    vehicle_service_review_step_three_id: string;

    @ApiProperty({
        description: 'Session ID',
        example: 'session_1234567890',
    })
    @IsOptional()
    session_id: string;

    @ApiProperty({
        description: 'Additional Images',
        example: ['image1.jpg', 'image2.jpg'],
        isArray: true,
    })
    @IsOptional()
    additional_image: string[];

    @ApiProperty({
        description: 'Comment',
        example: 'This is an additional comment for step three.',
    })
    @IsOptional()
    comment: string;

    @ApiProperty({
        description: 'Created By User ID',
        example: 'u1v2w3x4-y5z6-7a8b-9c0d-e1f2g3h4i5j6',
    })
    @IsNotEmpty()
    @IsUUID()
    created_by: string;
}
