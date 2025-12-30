import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";

@Injectable()
export class PatchStepOneSuccessFlagUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        const existingStepOne = await this.stepOneRepository.getStepOneById(id);
        if (!existingStepOne) {
            throw new Error(`Step One with ID ${id} not found.`);
        }
        const updatedSuccessFlag = {...existingStepOne, success_flag: !existingStepOne.success_flag};
        const updatedStepOne = await this.stepOneRepository.patchStepOneSuccessFlag(id, updatedSuccessFlag);
        return updatedStepOne;
    }

}