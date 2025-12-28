import { CreateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two.dto";
import { PatchStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/patch-step-two.dto";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";
import { UpdateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/update-step-two.dto";

export interface IStepTwoRepositoryInterface {
    // getStepTwoById(id: string): Promise<StepTwoDto | null>;
    getStepTwoByReviewId(reviewId: string): Promise<StepTwoDto | null>;
    createStepTwo(createDto: CreateStepTwoDto): Promise<StepTwoDto>;
    updateStepTwo(id: string, updateDto: UpdateStepTwoDto): Promise<StepTwoDto>;
    patchIsActiveStepTwo(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoDto>;
    patchSuccessFlagStepTwo(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoDto>;
}
