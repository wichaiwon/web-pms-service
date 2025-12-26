import { Injectable, Inject, ConflictException, NotFoundException } from "@nestjs/common";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity";
import type { IVehicleServiceReviewDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/vehicle-service-review-detail.repository.interface";
import { CreateVehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-vehicle-service-review-detail.dto";
import { VehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/vehicle-service-review-detail.dto";

@Injectable()
export class CreateVehicleServiceReviewDetailsUseCase {
 constructor(
    @Inject('IVehicleServiceReviewDetailRepository')
    private readonly vehicleServiceReviewDetailRepository: IVehicleServiceReviewDetailRepositoryInterface,
    
 ) {}
    async execute(createDto: CreateVehicleServiceReviewDetailDto[]):Promise<VehicleServiceReviewDetailDto[]> {
        //ต้องเช็คทุกตัวก่อนว่ามีตัวไหนซ้ำไหม
        for (const dto of createDto) {
            const existingActive = await this.vehicleServiceReviewDetailRepository.getVehicleServiceReviewById(dto.vehicle_service_review_id);
            if (existingActive) {
                throw new ConflictException(`Vehicle service review detail already exists for vehicle service review ID: ${dto.vehicle_service_review_id}.`);
            }
        }
        const createdDetails: VehicleServiceReviewDetail[] = [];
        for (const dto of createDto) {
            const createdDetail = await this.vehicleServiceReviewDetailRepository.createVehicleServiceReviewDetail(dto);
            createdDetails.push(createdDetail);
        }
        return createdDetails;
    }
}