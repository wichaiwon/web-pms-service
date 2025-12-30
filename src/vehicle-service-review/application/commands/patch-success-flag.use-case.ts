import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewSuccessFlagDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-success-flag.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class PatchSuccessFlagUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReviewDto> {
        const existingReview = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(id);
        if (!existingReview) {
            throw new NotFoundException('Vehicle service review not found');
        }
        const updatedReview = await this.vehicleServiceReviewRepository.patchSuccessFlag(id, patchDto);
        return updatedReview;
    }
}
