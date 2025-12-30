import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { UpdateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one.dto";
import { VehicleServiceReviewStepOne } from "../entities/vehicle-service-review-step-one.entity";
import { CreateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one-additional.dto";
import { VehicleServiceReviewStepOneAdditional } from "../entities/vehicle-service-review-step-one-additional.entity";
import { UpdateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one-additional.dto";

export interface IStepOneRepositoryInterface {
    getStepOneById(id: string): Promise<VehicleServiceReviewStepOne | null>;
    getStepOneByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewStepOne | null>;
    createStepOne(createDto: CreateStepOneDto): Promise<VehicleServiceReviewStepOne>;
    createStepOnes(createDtos: CreateStepOneDto[]): Promise<VehicleServiceReviewStepOne[]>;
    updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOne>;
    patchStepOneIsActive(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne>;
    patchStepOneSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne>;
    getStepOneAdditionalById(id: string): Promise<VehicleServiceReviewStepOneAdditional | null>;
    getStepOneAdditionalByStepOneId(stepOneId: string): Promise<VehicleServiceReviewStepOneAdditional | null>;
    createStepOneAdditional(createDto: CreateStepOneAdditionalDto): Promise<VehicleServiceReviewStepOneAdditional>;
    updateStepOneAdditional(id: string, updateDto: UpdateStepOneAdditionalDto): Promise<VehicleServiceReviewStepOneAdditional>;
    patchStepOneAdditionalIsActive(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional>;
    patchStepOneAdditionalSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional>;
}
