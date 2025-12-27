import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";

@Injectable()
export class GetStepOneByReviewIdUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(vehicleServiceReviewId: string): Promise<StepOneDto | null> {
        return this.stepOneRepository.getStepOneByReviewId(vehicleServiceReviewId);
    }
}