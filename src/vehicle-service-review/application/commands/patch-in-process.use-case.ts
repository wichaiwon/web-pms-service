import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewInProcessDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-in-process.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class PatchInProcessUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }
    
    async execute(id: string, patchDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReviewDto> {
        // Business Logic: Validate ID
        if (!id) {
            throw new NotFoundException('Vehicle service review ID is required');
        }

        // เรียก Repository ทำ Data Access เท่านั้น
        return await this.vehicleServiceReviewRepository.patchInProcessFlag(id, patchDto);
    }
}
