import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class PatchStepThreeDto {
    @ApiPropertyOptional({
        description: 'Success completion flag',
        example: true,
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    success_flag?: boolean

    @ApiPropertyOptional({
        description: 'Indicates whether the record is active',
        example: true,
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean

    @ApiPropertyOptional({
        description: 'Identifier of the user who last updated the record',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsNotEmpty()
    @IsUUID()
    updated_by: string
}
