import { Inject, Injectable } from "@nestjs/common";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity";
import type { IVehicleServiceReviewDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/vehicle-service-review-detail.repository.interface";
import { VehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/vehicle-service-review-detail.dto";

@Injectable()
export class GetVehicleServiceReviewDetailByIdUseCase {
    constructor(
        @Inject('IVehicleServiceReviewDetailRepository')
        private readonly vehicleServiceReviewDetailRepository: IVehicleServiceReviewDetailRepositoryInterface
    ) { }
    async execute(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetailDto | null> {
        return this.vehicleServiceReviewDetailRepository.getVehicleServiceReviewById(vehicleServiceReviewId);
    }
}
