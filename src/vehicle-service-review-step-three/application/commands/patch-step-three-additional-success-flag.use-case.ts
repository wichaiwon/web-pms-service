import { Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { PatchStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/patch-step-three.dto";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";

@Injectable()
export class PatchStepThreeAdditionalSuccessFlagUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface,
    ) { }

    async execute(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeRepository.patchStepThreeAdditionalIsActive(id, patchDto);
    }
}
