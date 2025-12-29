import { Inject, Injectable } from "@nestjs/common";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import { PatchStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/patch-step-four.dto";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";

@Injectable()
export class PatchStepfourIsActiveUseCase {
    constructor(
        @Inject('IStepFourRepository')
        private readonly stepFourRepository: IStepFourRepositoryInterface,
    ) {}
    async execute(id: string,patchDto:PatchStepfourDto): Promise<StepFourDto> {
        return this.stepFourRepository.patchStepFourIsActive(id, patchDto);
    }
}
