import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class PatchVehicleServiceReviewInProcessDto {
    @ApiProperty({ description: 'Flag indicating if the review is in process', example: true })
    @IsBoolean()
    in_process_flag: boolean;

    @ApiProperty({ description: 'User who updated the review', example: 'edc6a03a-6285-4a09-aab6-decb494cf522' })
    @IsUUID()
    updated_by: string;
}
