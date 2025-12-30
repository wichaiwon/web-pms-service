import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";

@Injectable()
export class GetStepTwoByReviewIdUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}
    async execute(reviewId: string): Promise<StepTwoDto | null> {
        const existingReview =  await this.stepTwoRepository.getStepTwoByReviewId(reviewId);
        if (!existingReview) {
         throw new NotFoundException(`Step Two with Review ID ${reviewId} not found.`);
        }
        return existingReview;
    }
}
