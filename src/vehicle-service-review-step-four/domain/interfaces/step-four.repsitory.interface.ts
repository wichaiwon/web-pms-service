import { CreateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/create-step-four.dto";
import { VehicleServiceReviewStepFour } from "../entities/vehicle-service-review-step-four.entity";
import { UpdateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/update-step-four.dto";
import { PatchStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/patch-step-four.dto";

export interface IStepFourRepositoryInterface {
    getStepFourById(id: string): Promise<VehicleServiceReviewStepFour | null>;
    getStepFourByReviewId(reviewId: string): Promise<VehicleServiceReviewStepFour | null>;
    createStepFour(createDto: CreateStepfourDto): Promise<VehicleServiceReviewStepFour>;
    updateStepFour(id: string, updateDto: UpdateStepfourDto): Promise<VehicleServiceReviewStepFour>;
    createStepFours(createDtos: CreateStepfourDto[]): Promise<VehicleServiceReviewStepFour[]>;
    patchStepFourIsActive(id: string, patchDto: PatchStepfourDto): Promise<VehicleServiceReviewStepFour>;
    patchStepFourSuccessFlag(id: string, patchDto: PatchStepfourDto): Promise<VehicleServiceReviewStepFour>;
}
