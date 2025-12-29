import { Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { CreateStepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/create-step-three-additional.dto";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";

@Injectable()
export class CreateStepThreeAdditionalUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeAdditionalRepository: IStepThreeRepositoryInterface,
    ) { }
    async execute(createDto: CreateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeAdditionalRepository.createStepThreeAdditional(createDto);
    }
}
