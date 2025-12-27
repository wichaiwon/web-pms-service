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
import { PatchIsActiveUseCase } from "./commands/patch-is-active.use-case";
import { PatchSuccessFlagUseCase } from "./commands/patch-success-flag.use-case";
import { AutoSyncVehicleServiceReviewUseCase } from "./commands/auto-sync-vehicle-service-review.use-case";
import { CancelVehicleServiceReviewUseCase } from "./commands/cancel-vehicle-service-review.use-case";
import { ReIssueVehicleServiceReviewUseCase } from "./commands/reissue-vehicle-service-review.use-case";

@Injectable()
export class VehicleServiceReviewService implements IVehicleServiceReviewServiceInterface {
    constructor(
        private readonly autoSyncVehicleServiceReviewUseCase: AutoSyncVehicleServiceReviewUseCase,
        private readonly createVehicleServiceReviewUseCase: CreateVehicleServiceReviewUseCase,
        private readonly createVehicleServiceReviewsUseCase: CreateVehicleServiceReviewsUseCase,
        private readonly getVehicleServiceReviewUseCase: GetVehicleServiceReviewUseCase,
        private readonly updateVehicleServiceReviewUseCase: UpdateVehicleServiceReviewUseCase,
        private readonly patchInProcessUseCase: PatchInProcessUseCase,
        private readonly patchSuccessFlagUseCase: PatchSuccessFlagUseCase,
        private readonly patchIsActiveUseCase: PatchIsActiveUseCase,
        private readonly reissueVehicleServiceReviewUseCase: ReIssueVehicleServiceReviewUseCase,
        private readonly cancelVehicleServiceReviewUseCase: CancelVehicleServiceReviewUseCase,
    ) { }


    async getVehicleServiceReview(branch: Branch): Promise<VehicleServiceReviewDto[]> {
        return this.getVehicleServiceReviewUseCase.execute(branch);
    }

    async autoSyncVehicleServiceReview(): Promise<{ synced: number; skipped: number; errors: number }> {
        return this.autoSyncVehicleServiceReviewUseCase.execute();
    }
    


    async createVehicleServiceReview(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        return this.createVehicleServiceReviewUseCase.execute(createDto);
    }

    async createVehicleServiceReviews(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReviewDto[]> {
        return this.createVehicleServiceReviewsUseCase.execute(createDtos);
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

    async patchIsActive(id: string, patchIsActiveDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        return this.patchIsActiveUseCase.execute(id, patchIsActiveDto);
    }

    async reissueVehicleServiceReview(id: string, patchDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        return this.reissueVehicleServiceReviewUseCase.execute(id, patchDto);
    }
    async cancelVehicleServiceReview(id: string, patchIsActiveDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        return this.cancelVehicleServiceReviewUseCase.execute(id, patchIsActiveDto);
    }
}
