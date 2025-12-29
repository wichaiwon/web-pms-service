import { Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";

@Injectable()
export class GetStepThreeByReviewIdUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) { }
    async execute(reviewId: string): Promise<StepThreeDto | null> {
        return this.stepThreeRepository.getStepThreeByReviewId(reviewId);
    }
}
