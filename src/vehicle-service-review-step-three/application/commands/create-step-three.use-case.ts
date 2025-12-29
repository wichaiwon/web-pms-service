import { Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { CreateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/create-step-three.dto";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";

@Injectable()
export class CreateStepThreeUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) {}

    async execute(createDto:CreateStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeRepository.createStepThree(createDto);
    }
}
