import { IsNotEmpty, IsOptional } from "class-validator";

export class PatchStepfourDto {
    @IsOptional()
    is_active?: boolean
    @IsOptional()
    success_flag?: boolean
    @IsNotEmpty()
    updated_by: string;
}
