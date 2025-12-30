import { CreateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/create-step-four.dto";
import { PatchStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/patch-step-four.dto";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";
import { UpdateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/update-step-four.dto";

export interface IStepFourServiceInterface {
    getStepFourById(id: string): Promise<StepFourDto | null>;
    getStepFourByReviewId(reviewId: string): Promise<StepFourDto | null>;
    createStepFour(createDto: CreateStepfourDto): Promise<StepFourDto>;
    createStepFours(createDtos: CreateStepfourDto[]): Promise<StepFourDto[]>;
    updateStepFour(reviewId: string, updateDto: UpdateStepfourDto): Promise<StepFourDto>;
    patchStepFourIsActive(id: string, patchDto: PatchStepfourDto): Promise<StepFourDto>;
    patchStepFourSuccessFlag(id: string, patchDto: PatchStepfourDto): Promise<StepFourDto>;
}
