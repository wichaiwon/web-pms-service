import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";


@Injectable()
export class CreateStepOneUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(createDto: CreateStepOneDto): Promise<StepOneDto> {
        const existingActive = await this.stepOneRepository.getStepOneByReviewId(createDto.vehicle_service_review_id);
        if (existingActive) {
            throw new ConflictException('Step One already exists for this vehicle service review ID.');
        }
        return await this.stepOneRepository.createStepOne(createDto);
    }
}
