import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { CreateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/create-step-three.dto";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";

@Injectable()
export class CreateStepThreesUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) { }

    async execute(createDto: CreateStepThreeDto[]): Promise<StepThreeDto[]> {
        for (const dtos of createDto) {
            const existingReview = await this.stepThreeRepository.getStepThreeByReviewId(dtos.vehicle_service_review_id);
            if (existingReview) {
                throw new ConflictException(`Step Three already exists for vehicle service review ID: ${dtos.vehicle_service_review_id}.`);
            }
        }
        const createdStepThrees: StepThreeDto[] = []
        for (const dtos of createDto) {
            const createdStepThree = await this.stepThreeRepository.createStepThree(dtos);
            createdStepThrees.push(createdStepThree);
        }
        return createdStepThrees;
    }
}
