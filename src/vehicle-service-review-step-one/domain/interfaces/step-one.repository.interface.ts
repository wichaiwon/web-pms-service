import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";
import { UpdateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one.dto";
import { VehicleServiceReviewStepOne } from "../entities/vehicle-service-review-step-one.entity";

export interface IStepOneRepositoryInterface {
    getStepOneByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewStepOne | null>;
    createStepOne(createDto: CreateStepOneDto): Promise<VehicleServiceReviewStepOne>;
    updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOne>;
    patchIsActiveStepOne(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne>;
    patchSuccessFlagStepOne(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne>;
}
