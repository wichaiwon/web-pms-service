import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class GetVehicleServiceReviewByIdUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }
    async execute(id: string): Promise<VehicleServiceReviewDto> {
        const existingReview = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(id);
        if (!existingReview) {
            throw new NotFoundException(`Vehicle Service Review with ID ${id} not found.`);
        }
        return existingReview;
    }
}
