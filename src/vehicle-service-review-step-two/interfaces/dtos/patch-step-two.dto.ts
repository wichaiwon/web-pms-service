import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PatchStepTwoDto {
    @ApiProperty({type: Boolean, example: true})
    @IsOptional()
    is_active?: boolean;

    @ApiProperty({type: Boolean, example: true})
    @IsOptional()
    success_flag?: boolean;
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsOptional()
    updated_by: string;
}
