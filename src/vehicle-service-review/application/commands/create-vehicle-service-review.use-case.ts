import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class CreateVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) {}

    async execute(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        // สร้าง vehicle service review ก่อน
        const createdReview = await this.vehicleServiceReviewRepository.createVehicleServiceReview(createDto);
        
        // สร้าง detail อัตโนมัติสำหรับ review ที่สร้างใหม่
        await this.detailRepository.createDetail({
            vehicle_service_review_id: createdReview.id,
            created_by: createDto.created_by,
        });
        // สร้าง step one อัตโนมัติสำหรับ review ที่สร้างใหม่
        await this.stepOneRepository.createStepOne({
            vehicle_service_review_id: createdReview.id,
            created_by: createDto.created_by,
        });
        
        return createdReview;
    }
}
