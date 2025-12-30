import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import { CreateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/create-step-four.dto";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";

@Injectable()
export class CreateStepFoursUseCase {
    constructor(
        @Inject('IStepFourRepository')
        private readonly stepFourRepository: IStepFourRepositoryInterface,
    ) {}
    async execute(createDtos:CreateStepfourDto[]): Promise<StepFourDto[]> {
        for (const dto of createDtos) {
            const existingStepFour = await this.stepFourRepository.getStepFourByReviewId(dto.vehicle_service_review_id);
            if (existingStepFour) {
                throw new ConflictException(`Step Four for review ID ${dto.vehicle_service_review_id} already exists`);
            }
        }
        const createdStepFours: StepFourDto[] = [];
        for (const dto of createDtos) {
            const createdStepFour =  await this.stepFourRepository.createStepFour(dto);
            createdStepFours.push(createdStepFour);
        }
        return createdStepFours;       
    }
}
