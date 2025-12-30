import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";

@Injectable()
export class PatchStepOneAdditionalSuccessFlagUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string, patchDto:PatchStepOneDto): Promise<StepOneAdditionalDto> {
        const existingAdditional = await this.stepOneRepository.getStepOneAdditionalById(id);
        if (!existingAdditional) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        const updatedSuccessFlag = {...existingAdditional, success_flag: !existingAdditional.success_flag};
        const updatedAdditional = await this.stepOneRepository.patchStepOneAdditionalSuccessFlag(id, updatedSuccessFlag);
        return updatedAdditional;
    }
}

