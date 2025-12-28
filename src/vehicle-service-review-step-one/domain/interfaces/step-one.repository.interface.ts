import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { UpdateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one.dto";
import { VehicleServiceReviewStepOne } from "../entities/vehicle-service-review-step-one.entity";
import { CreateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one-additional.dto";
import { VehicleServiceReviewStepOneAdditional } from "../entities/vehicle-service-review-step-one-additional.entity";
import { UpdateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one-additional.dto";

export interface IStepOneRepositoryInterface {
    getStepOneByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewStepOne | null>;
    createStepOne(createDto: CreateStepOneDto): Promise<VehicleServiceReviewStepOne>;
    createStepOneAdditional(createDto:CreateStepOneAdditionalDto): Promise<VehicleServiceReviewStepOneAdditional>;
    updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOne>;
    patchIsActiveStepOne(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne>;
    patchSuccessFlagStepOne(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne>;
    updateStepOneAdditional(id: string, updateDto: UpdateStepOneAdditionalDto): Promise<VehicleServiceReviewStepOneAdditional>;
    patchIsActiveStepOneAdditional(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional>;
    patchSuccessFlagStepOneAdditional(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional>;
}
