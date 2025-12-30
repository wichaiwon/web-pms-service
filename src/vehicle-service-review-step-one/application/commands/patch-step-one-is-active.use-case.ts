import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";

@Injectable()
export class PatchStepOneUseIsActiveCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        const existingStepOne = await this.stepOneRepository.getStepOneById(id);
        if (!existingStepOne) {
            throw new Error(`Step One with ID ${id} not found.`);
        }
        const updatedIsActive = {...existingStepOne, is_active: !existingStepOne.is_active};
        const updatedStepOne = await this.stepOneRepository.patchStepOneIsActive(id, updatedIsActive);
        return updatedStepOne;
    }
}
