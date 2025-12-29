import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class PatchVehicleServiceReviewInProcessDto {
    @ApiProperty({ description: 'Flag indicating if the review is in process', example: true })
    @IsBoolean()
    in_process_flag: boolean;

    @ApiProperty({
        description: 'List of responsible user IDs',
        example: ['a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 'p5o4n3m2-l1k0-j9i8-h7g6-f5e4d3c2b1a0'],
        type: [String],
        isArray: true,
    })
    @IsNotEmpty()
    @IsUUID("4", { each: true })
    responsible: string[];

    @ApiProperty({ description: 'User who updated the review', example: 'edc6a03a-6285-4a09-aab6-decb494cf522' })
    @IsUUID()
    updated_by: string;
}
