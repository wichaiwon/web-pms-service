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
export class CreateVehicleServiceReviewUseCase {
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

    async execute(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        // สร้าง vehicle service review ก่อน
        const createdReview = await this.vehicleServiceReviewRepository.createVehicleServiceReview(createDto);
        
        // สร้าง detail, step one, และ step two อัตโนมัติสำหรับ review ที่สร้างใหม่
        const repositories = [
            this.detailRepository.createDetail.bind(this.detailRepository),
            this.stepOneRepository.createStepOne.bind(this.stepOneRepository),
            this.stepTwoRepository.createStepTwo.bind(this.stepTwoRepository),
            this.stepThreeRepository.createStepThree.bind(this.stepThreeRepository),
            this.stepFourRepository.createStepFour.bind(this.stepFourRepository),
        ];

        await Promise.all(
            repositories.map(repoFn =>
            repoFn({
                vehicle_service_review_id: createdReview.id,
                created_by: createDto.created_by,
            })
            )
        );
        
        return createdReview;
    }
}
