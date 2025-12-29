import { Inject, Injectable } from "@nestjs/common";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";

@Injectable()
export class GetStepFourByReviewIdUseCase {
    constructor(
        @Inject('IStepFourRepository')
        private readonly stepFourRepository: IStepFourRepositoryInterface,
    ) { }

    async execute(reviewId: string): Promise<StepFourDto | null> {
        return this.stepFourRepository.getStepFourByReviewId(reviewId);
    }
}
