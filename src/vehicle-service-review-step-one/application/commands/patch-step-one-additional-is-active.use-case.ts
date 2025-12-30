import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";

@Injectable()
export class PatchStepOneAdditionalIsActiveUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto> {
        const existingAdditional = await this.stepOneRepository.getStepOneAdditionalById(id);
        if (!existingAdditional) {
            throw new Error(`Step One Additional with ID ${id} not found.`);
        }
        const updatedIsActive = {...existingAdditional, is_active: !existingAdditional.is_active};
        const updatedAdditional = await this.stepOneRepository.patchStepOneAdditionalIsActive(id, updatedIsActive);
        return updatedAdditional;
    }
}
