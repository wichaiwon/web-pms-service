import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";

@Injectable()
export class PatchSuccessFlagStepOneAdditionalUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string, patchDto:PatchStepOneDto): Promise<StepOneAdditionalDto> {
        return await this.stepOneRepository.patchSuccessFlagStepOneAdditional(id, patchDto);
    }
}

