import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class CreateVehicleServiceReviewsUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) {}

    async execute(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReviewDto[]> {
        // สร้าง vehicle service reviews แบบ bulk
        const createdReviews = await this.vehicleServiceReviewRepository.createVehicleServiceReviews(createDtos);
        
        // สร้าง detail อัตโนมัติสำหรับทุก review ที่สร้าง โดยใช้ id และ created_by ที่ถูกต้อง
        const detailDtos = createdReviews.map((review, index) => ({
            vehicle_service_review_id: review.id,
            created_by: createDtos[index].created_by,
        }));
        
        await this.detailRepository.createDetails(detailDtos);
        
        return createdReviews;
    }
}
