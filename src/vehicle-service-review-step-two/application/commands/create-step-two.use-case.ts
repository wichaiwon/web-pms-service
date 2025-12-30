import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { CreateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two.dto";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";

@Injectable()
export class CreateStepTwoUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}

    async execute(createDto: CreateStepTwoDto): Promise<StepTwoDto> {
        const existReview = await this.stepTwoRepository.getStepTwoByReviewId(createDto.vehicle_service_review_id);
        if (existReview) {
            throw new ConflictException('Step two review already exists for this review ID.');
        }
        const stepTwo = await this.stepTwoRepository.createStepTwo(createDto);
        return stepTwo;
    }
}
