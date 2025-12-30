import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { PatchStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/patch-step-two.dto";
import { StepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two-additional.dto";

@Injectable()
export class PatchStepTwoAdditionalIsActiveUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoAdditionalRepository: IStepTwoRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoAdditionalDto> {
        const existStepTwoAdditional = await this.stepTwoAdditionalRepository.getStepTwoAdditionalById(id);
        if (!existStepTwoAdditional) {
            throw new NotFoundException(`Step two additional review ${id} not found.`);
        }
        const updatedStepTwoAdditional = await this.stepTwoAdditionalRepository.patchStepTwoAdditionalIsActive(id, patchDto);
        return updatedStepTwoAdditional;
    }
}
