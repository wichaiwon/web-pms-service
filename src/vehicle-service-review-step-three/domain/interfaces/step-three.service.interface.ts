import { CreateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/create-step-three.dto";
import { PatchStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/patch-step-three.dto";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";
import { UpdateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/update-step-three.dto";

export interface IStepThreeServiceInterface {
    getStepThreeByReviewId(reviewId: string): Promise<StepThreeDto | null>;
    createStepThree(createDto: CreateStepThreeDto): Promise<StepThreeDto>;
    updateStepThree(id: string, updateDto: UpdateStepThreeDto): Promise<StepThreeDto>;
    patchStepThreeIsActive(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto>;
    patchStepThreeSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto>;
}
