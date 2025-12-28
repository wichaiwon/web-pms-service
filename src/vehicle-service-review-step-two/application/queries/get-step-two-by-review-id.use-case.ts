import { Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";

@Injectable()
export class GetStepTwoByReviewIdUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}
    async execute(reviewId: string): Promise<StepTwoDto | null> {
        return this.stepTwoRepository.getStepTwoByReviewId(reviewId);
    }
}
