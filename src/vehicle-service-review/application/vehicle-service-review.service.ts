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
import { Branch } from "src/shared/enum/employee/employee.enum";
import { UpdateVehicleServiceReviewUseCase } from "./commands/update-vehicle-service-review.use-case";
import { PatchInProcessUseCase } from "./commands/patch-in-process.use-case";
import { PatchVehicleServiceReviewIsActiveDto } from "../interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { PatchIsActiveUseCase } from "./commands/patch-active-status.use-case";
import { PatchSuccessFlagUseCase } from "./commands/patch-success-flag.use-case";

@Injectable()
export class VehicleServiceReviewService implements IVehicleServiceReviewServiceInterface {
    constructor(
        private readonly createVehicleServiceReviewUseCase: CreateVehicleServiceReviewUseCase,
        private readonly createVehicleServiceReviewsUseCase: CreateVehicleServiceReviewsUseCase,
        private readonly getVehicleServiceReviewUseCase: GetVehicleServiceReviewUseCase,
        private readonly updateVehicleServiceReviewUseCase: UpdateVehicleServiceReviewUseCase,
        private readonly patchInProcessUseCase: PatchInProcessUseCase,
        private readonly patchSuccessFlagUseCase: PatchSuccessFlagUseCase,
        private readonly patchActiveStatusUseCase: PatchIsActiveUseCase,
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

    async updateVehicleServiceReview(id: string, updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        return this.updateVehicleServiceReviewUseCase.execute(id, updateDto);
    }

    async patchInProcessFlag(id: string, patchInprocessDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReviewDto> {
        return this.patchInProcessUseCase.execute(id, patchInprocessDto);
    }

    async patchSuccessFlag(id: string, patchSuccessDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReviewDto> {
        return this.patchSuccessFlagUseCase.execute(id, patchSuccessDto);
    }

    async patchActiveStatus(id: string, patchActiveStatusDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        return this.patchActiveStatusUseCase.execute(id, patchActiveStatusDto);
    }
}
