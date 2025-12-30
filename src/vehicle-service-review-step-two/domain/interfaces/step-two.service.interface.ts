import { CreateStepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two-additional.dto";
import { CreateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two.dto";
import { PatchStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/patch-step-two.dto";
import { StepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two-additional.dto";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";
import { UpdateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/update-step-two.dto";

export interface IStepTwoServiceInterface {
    getStepTwoById(id: string): Promise<StepTwoDto | null>;
    getStepTwoByReviewId(reviewId: string): Promise<StepTwoDto | null>;
    createStepTwo(createDto: CreateStepTwoDto): Promise<StepTwoDto>;
    createStepTwos(createDto: CreateStepTwoDto[]): Promise<StepTwoDto[]>;
    updateStepTwo(id: string, updateDto: UpdateStepTwoDto): Promise<StepTwoDto>;
    patchStepTwoIsActive(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoDto>;
    patchStepTwoSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoDto>;
    getStepTwoAdditionalById(id: string): Promise<StepTwoAdditionalDto | null>;
    getStepTwoAdditionalByStepTwoId(stepTwoId: string): Promise<StepTwoAdditionalDto | null>;
    createStepTwoAdditional(createDto : CreateStepTwoAdditionalDto): Promise<StepTwoAdditionalDto>;
    patchStepTwoAdditionalIsActive(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoAdditionalDto>;
    patchStepTwoAdditionalSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoAdditionalDto>;
}
