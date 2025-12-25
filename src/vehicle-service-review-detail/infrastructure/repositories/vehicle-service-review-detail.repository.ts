import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity";
import { IVehicleServiceReviewDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/vehicle-service-review-detail.repository.interface";
import { CreateVehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-vehicle-service-review-detail.dto";
import { Repository } from "typeorm";

@Injectable()
export class VehicleServiceReviewDetailRepository implements IVehicleServiceReviewDetailRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewDetail)
        private readonly vehicleServiceReviewDetailRepository: Repository<VehicleServiceReviewDetail>,
    ) { }

    async createVehicleServiceReviewDetail(
        createDto: CreateVehicleServiceReviewDetailDto
    ): Promise<VehicleServiceReviewDetail> {
        const newDetail = this.vehicleServiceReviewDetailRepository.create(createDto);
        return await this.vehicleServiceReviewDetailRepository.save(newDetail);
    }

    async getVehicleServiceReviewById(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetail | null> {
        return await this.vehicleServiceReviewDetailRepository.findOne({
            where: { vehicle_service_review_id: vehicleServiceReviewId , is_active: true }
        });
    }

}
