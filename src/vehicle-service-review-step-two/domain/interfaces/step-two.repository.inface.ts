import { CreateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two.dto";
import { PatchStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/patch-step-two.dto";
import { UpdateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/update-step-two.dto";
import { VehicleServiceReviewStepTwoAdditional } from "../entities/vehicle-service-review-step-two-additional.entity";
import { VehicleServiceReviewStepTwo } from "../entities/vehicle-service-review-step-two.entity";
import { CreateStepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two-additional.dto";
import { UpdateStepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/update-step-two-additional.dto";

export interface IStepTwoRepositoryInterface {
    getStepTwoById(id: string): Promise<VehicleServiceReviewStepTwo | null>;
    getStepTwoByReviewId(reviewId: string): Promise<VehicleServiceReviewStepTwo | null>;
    createStepTwo(createDto: CreateStepTwoDto): Promise<VehicleServiceReviewStepTwo>;
    createStepTwos(createDto: CreateStepTwoDto[]): Promise<VehicleServiceReviewStepTwo[]>;    
    updateStepTwo(id: string, updateDto: UpdateStepTwoDto): Promise<VehicleServiceReviewStepTwo>;
    patchStepTwoIsActive(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwo>;
    patchStepTwoSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwo>;
    getStepTwoAdditionalById(id: string): Promise<VehicleServiceReviewStepTwoAdditional | null>;
    getStepTwoAdditionalByStepTwoId(stepTwoId: string): Promise<VehicleServiceReviewStepTwoAdditional | null>;
    createStepTwoAdditional(createDto: CreateStepTwoAdditionalDto): Promise<VehicleServiceReviewStepTwoAdditional>;
    updateStepTwoAdditional(id: string, updateDto: UpdateStepTwoAdditionalDto): Promise<VehicleServiceReviewStepTwoAdditional>;
    patchStepTwoAdditionalIsActive(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwoAdditional>;
    patchStepTwoAdditionalSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwoAdditional>;
}
