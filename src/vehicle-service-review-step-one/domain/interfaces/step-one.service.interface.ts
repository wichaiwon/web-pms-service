import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";
import { UpdateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one.dto";

export interface IStepOneServiceInterface {
    getStepOneByReviewId(vehicleServiceReviewId: string): Promise<StepOneDto | null>;
    createStepOne(createDto: CreateStepOneDto): Promise<StepOneDto>;
    updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<StepOneDto>;
    patchIsActiveStepOne(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto>;
    patchSuccessFlagStepOne(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto>;
}
