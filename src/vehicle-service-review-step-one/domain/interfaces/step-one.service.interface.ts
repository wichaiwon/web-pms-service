import { CreateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one-additional.dto";
import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";
import { UpdateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one-additional.dto";
import { UpdateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one.dto";

export interface IStepOneServiceInterface {
    getStepOneById(id: string): Promise<StepOneDto | null>;
    getStepOneByReviewId(vehicleServiceReviewId: string): Promise<StepOneDto | null>;
    createStepOne(createDto: CreateStepOneDto): Promise<StepOneDto>;
    createStepOnes(createDtos: CreateStepOneDto[]): Promise<StepOneDto[]>;
    updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<StepOneDto>;
    patchStepOneIsActive(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto>;
    patchStepOneSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto>;
    getStepOneAdditionalById(id: string): Promise<StepOneAdditionalDto | null>;
    getStepOneAdditionalByStepOneId(stepOneId: string): Promise<StepOneAdditionalDto | null>;
    createStepOneAdditional(createDto: CreateStepOneAdditionalDto): Promise<StepOneAdditionalDto>;
    updateStepOneAdditional(id: string, updateDto: UpdateStepOneAdditionalDto): Promise<StepOneAdditionalDto>;
    patchStepOneAdditionalIsActive(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto>;
    patchStepOneAdditionalSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto>;

}
