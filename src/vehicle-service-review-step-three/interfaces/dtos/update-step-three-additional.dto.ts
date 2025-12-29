import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateStepThreeAdditionalDto {
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
    updated_by: string;
}
