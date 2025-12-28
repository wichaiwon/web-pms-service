import { Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { PatchStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/patch-step-two.dto";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";

@Injectable()
export class PatchStepTwoSuccessFlagUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}
    async execute(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoDto> {
        return this.stepTwoRepository.patchSuccessFlagStepTwo(id, patchDto);
    }
}
