import { IsNotEmpty, IsOptional } from "class-validator";

export class PatchDetailDto {
    @IsOptional()
    success_flag?: boolean;
    @IsOptional()
    is_active?: boolean;
    @IsNotEmpty()
    updated_by: string;
}
