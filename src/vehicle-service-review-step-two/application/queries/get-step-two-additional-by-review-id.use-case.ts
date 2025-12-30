import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two-additional.dto";

@Injectable()
export class GetStepTwoAdditionalByStepTwoIdUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}
    async execute(reviewId: string): Promise<StepTwoAdditionalDto | null> {
        const existingReview =  await this.stepTwoRepository.getStepTwoAdditionalByStepTwoId(reviewId);
        if (!existingReview) {
         throw new NotFoundException(`Step Two Additional with Review ID ${reviewId} not found.`);
        }
        return existingReview;
    }
}
