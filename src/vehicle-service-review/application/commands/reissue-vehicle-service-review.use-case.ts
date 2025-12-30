import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class ReIssueVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) { }

    async execute(id: string, patchDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        // ดึง review ที่ต้องการ reissue (review ยัง active อยู่)
        const review = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(id);
        if (!review) {
            throw new NotFoundException('Vehicle service review not found');
        }

        const [oldDetail, oldStepOne, oldStepTwo] = await Promise.all([
            this.detailRepository.getDetailByReviewId(id),
            this.stepOneRepository.getStepOneByReviewId(id),
            this.stepTwoRepository.getStepTwoByReviewId(id),
        ]);

        const inactivePatchDto = { ...patchDto, is_active: false };
        await Promise.all([
            oldDetail && this.detailRepository.patchIsActive(oldDetail.id, inactivePatchDto),
            oldStepOne && this.stepOneRepository.patchStepOneIsActive(oldStepOne.id, inactivePatchDto),
            oldStepTwo && this.stepTwoRepository.patchStepTwoIsActive(oldStepTwo.id, inactivePatchDto),
        ]); 

        await Promise.all([
            this.detailRepository.createDetail({ vehicle_service_review_id: id, created_by: patchDto.updated_by }),
            this.stepOneRepository.createStepOne({ vehicle_service_review_id: id, created_by: patchDto.updated_by }),
            this.stepTwoRepository.createStepTwo({ vehicle_service_review_id: id, created_by: patchDto.updated_by }),
        ]);

        return review;
    }
}
