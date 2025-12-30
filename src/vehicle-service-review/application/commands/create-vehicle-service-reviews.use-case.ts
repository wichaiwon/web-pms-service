import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
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
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface,
        @Inject('IStepFourRepository')
        private readonly stepFourRepository: IStepFourRepositoryInterface,
    ) {}

    async execute(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReviewDto[]> {
        // สร้าง vehicle service reviews แบบ bulk
        const createdReviews = await this.vehicleServiceReviewRepository.createVehicleServiceReviews(createDtos);
        
        // สร้าง detail, step one, และ step two อัตโนมัติสำหรับทุก review ที่สร้าง
        const dtos = createdReviews.map((review, i) => ({
            vehicle_service_review_id: review.id,
            created_by: createDtos[i].created_by,
        }));

        await Promise.all([
            this.detailRepository.createDetails(dtos),
            this.stepOneRepository.createStepOnes(dtos),
            this.stepTwoRepository.createStepTwos(dtos),
            this.stepThreeRepository.createStepThrees(dtos),
            this.stepFourRepository.createStepFours(dtos),
        ]);
        
        return createdReviews;
    }
}
