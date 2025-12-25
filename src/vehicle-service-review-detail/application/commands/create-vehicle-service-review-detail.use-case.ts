import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity";
import type { IVehicleServiceReviewDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/vehicle-service-review-detail.repository.interface";
import { CreateVehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-vehicle-service-review-detail.dto";

@Injectable()
export class CreateVehicleServiceReviewDetailUseCase {
 constructor(
    @Inject('IVehicleServiceReviewDetailRepository')
    private readonly vehicleServiceReviewRepository: IVehicleServiceReviewDetailRepositoryInterface
 ) {}
    async execute(createDto: CreateVehicleServiceReviewDetailDto):Promise<VehicleServiceReviewDetail> {
        const existingActive = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(createDto.vehicle_service_review_id);
        if (existingActive) {
            throw new ConflictException('Vehicle service review detail already exists for this vehicle service review ID.');
        }
        return await this.vehicleServiceReviewRepository.createVehicleServiceReviewDetail(createDto);
    }
}