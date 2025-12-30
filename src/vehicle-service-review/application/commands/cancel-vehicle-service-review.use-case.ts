import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class CancelVehicleServiceReviewUseCase {
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
    ) { }
    async execute(id: string, patchDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        // ยกเลิก review (set is_active=false)
        const review = await this.vehicleServiceReviewRepository.patchIsActive(id, patchDto);
        
        if (review) {
            const [detail, stepOne, stepTwo, stepThree] = await Promise.all([
            this.detailRepository.getDetailByReviewId(id),
            this.stepOneRepository.getStepOneByReviewId(id),
            this.stepTwoRepository.getStepTwoByReviewId(id),
            this.stepThreeRepository.getStepThreeByReviewId(id),
            ]);
            await Promise.all([
            detail && this.detailRepository.patchIsActive(detail.id, patchDto),
            stepOne && this.stepOneRepository.patchStepOneIsActive(stepOne.id, patchDto),
            stepTwo && this.stepTwoRepository.patchStepTwoIsActive(stepTwo.id, patchDto),
            stepThree && this.stepThreeRepository.patchStepThreeIsActive(stepThree.id, patchDto),
            ]);
        }
        
        return review;
    }
}
