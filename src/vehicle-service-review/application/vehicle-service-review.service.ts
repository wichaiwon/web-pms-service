import { Injectable } from "@nestjs/common";
import { IVehicleServiceReviewServiceInterface } from "../domain/interfaces/vehicle-service-review.service.interface";
import { CreateVehicleServiceReviewUseCase } from "./commands/create-vehicle-service-review.use-case";
import { CreateVehicleServiceReviewsUseCase } from "./commands/create-vehicle-service-reviews.use-case";
import { GetVehicleServiceReviewUseCase } from "./queries/get-vehicle-service-review.use-case";
import { VehicleServiceReviewDto } from "../interfaces/dtos/vehicle-service-review.dto";
import { CreateVehicleServiceReviewDto } from "../interfaces/dtos/create-vehicle-service-review.dto";
import { UpdateVehicleServiceReviewDto } from "../interfaces/dtos/update-vehicle-service-review.dto";
import { PatchVehicleServiceReviewInProcessDto } from "../interfaces/dtos/patch-vehicle-service-review-in-process.dto";
import { PatchVehicleServiceReviewSuccessFlagDto } from "../interfaces/dtos/patch-vehicle-service-review-success-flag.dto";
import { PatchVehicleServiceReviewActiveStatusDto } from "../interfaces/dtos/patch-vehicle-service-review-active-status.dto";
import { Branch } from "src/shared/enum/employee/employee.enum";

@Injectable()
export class VehicleServiceReviewService implements IVehicleServiceReviewServiceInterface {
    constructor(
        private readonly createVehicleServiceReviewUseCase: CreateVehicleServiceReviewUseCase,
        private readonly createVehicleServiceReviewsUseCase: CreateVehicleServiceReviewsUseCase,
        private readonly getVehicleServiceReviewUseCase: GetVehicleServiceReviewUseCase,
    ) { }

    async createVehicleServiceReview(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        return this.createVehicleServiceReviewUseCase.execute(createDto);
    }

    async createVehicleServiceReviews(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReviewDto[]> {
        return this.createVehicleServiceReviewsUseCase.execute(createDtos);
    }

    async getVehicleServiceReview(branch: Branch, is_active: boolean, date_booked: string): Promise<VehicleServiceReviewDto[]> {
        return this.getVehicleServiceReviewUseCase.executeAll(branch, is_active, date_booked);
    }

    async updateVehicleServiceReview(updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        // TODO: สร้าง UpdateVehicleServiceReviewUseCase
        throw new Error('Not implemented yet');
    }

    async patchInProcessFlag(patchInprocessDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReviewDto> {
        // TODO: สร้าง PatchInProcessFlagUseCase
        throw new Error('Not implemented yet');
    }

    async patchSuccessFlag(patchSuccessDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReviewDto> {
        // TODO: สร้าง PatchSuccessFlagUseCase
        throw new Error('Not implemented yet');
    }

    async patchActiveStatus(patchActiveStatusDto: PatchVehicleServiceReviewActiveStatusDto): Promise<VehicleServiceReviewDto> {
        // TODO: สร้าง PatchActiveStatusUseCase
        throw new Error('Not implemented yet');
    }
}
