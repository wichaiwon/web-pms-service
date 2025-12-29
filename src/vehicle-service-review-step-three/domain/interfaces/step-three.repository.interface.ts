import { CreateStepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/create-step-three-additional.dto";
import { CreateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/create-step-three.dto";
import { PatchStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/patch-step-three.dto";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";
import { UpdateStepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/update-step-three-additional.dto";
import { UpdateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/update-step-three.dto";

export interface IStepThreeRepositoryInterface {
    getStepThreeByReviewId(reviewId: string): Promise<StepThreeDto | null>;
    createStepThree(createDto:CreateStepThreeDto): Promise<StepThreeDto>;
    updateStepThree(id: string, updateDto: UpdateStepThreeDto): Promise<StepThreeDto>;
    patchStepThreeIsActive(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto>;
    patchStepThreeSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto>;
    createStepThreeAdditional(createDto: CreateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto>;
    updateStepThreeAdditional(id: string, updateDto: UpdateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto>;
    patchStepThreeAdditionalIsActive(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto>;
    patchStepThreeAdditionalSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto>;
}
