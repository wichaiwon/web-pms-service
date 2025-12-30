import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { CreateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two.dto";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";

@Injectable()
export class CreateStepTwosUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) { }

    async execute(createDto: CreateStepTwoDto[]): Promise<StepTwoDto[]> {
        for (const dto of createDto) {
            const existReview = await this.stepTwoRepository.getStepTwoByReviewId(dto.vehicle_service_review_id);
            if (existReview) {
                throw new ConflictException('Step two review already exists for this review ID.');
            }
        }
        const createdStepTwos: StepTwoDto[] = []
        for (const dto of createDto) {
            const stepTwo = await this.stepTwoRepository.createStepTwo(dto);
            createdStepTwos.push(stepTwo);
        }
        return createdStepTwos;
    }
}
