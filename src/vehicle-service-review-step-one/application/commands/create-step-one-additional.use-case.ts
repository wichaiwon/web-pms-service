import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { CreateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one-additional.dto";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";

@Injectable()
export class CreateStepOneAdditionalUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneAdditionalRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(createDto: CreateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        return await this.stepOneAdditionalRepository.createStepOneAdditional(createDto);
    }
}
