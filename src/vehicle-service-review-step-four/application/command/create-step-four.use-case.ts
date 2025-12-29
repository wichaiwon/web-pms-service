import { Inject, Injectable } from "@nestjs/common";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import { CreateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/create-step-four.dto";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";

@Injectable()
export class CreateStepFourUseCase {
    constructor(
        @Inject('IStepFourRepository')
        private readonly stepFourRepository: IStepFourRepositoryInterface,
    ) {}
    async execute(createDto:CreateStepfourDto): Promise<StepFourDto> {
        return this.stepFourRepository.createStepFour(createDto);
    }
}
