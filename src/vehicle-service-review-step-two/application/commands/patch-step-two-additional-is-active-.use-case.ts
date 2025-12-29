import { Inject, Injectable } from "@nestjs/common";
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
        return this.stepTwoAdditionalRepository.patchStepTwoAdditionalIsActive(id, patchDto);
    }
}
