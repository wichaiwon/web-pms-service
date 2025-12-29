import { Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { CreateStepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/create-step-two-additional.dto";
import { StepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two-additional.dto";

@Injectable()
export class CreateStepTwoAdditionalUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoAdditionalRepository: IStepTwoRepositoryInterface,
    ) { }
    async execute(createDto: CreateStepTwoAdditionalDto): Promise<StepTwoAdditionalDto> {
        return this.stepTwoAdditionalRepository.createStepTwoAdditional(createDto);
    }
}
