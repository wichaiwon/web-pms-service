import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { PatchStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/patch-step-three.dto";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";

@Injectable()
export class PatchStepThreeAdditionalIsActiveUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface,
    ) { }

    async execute(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto> {
        const existingStepThreeAdditional = await this.stepThreeRepository.getStepThreeAdditionalById(id);
        if (!existingStepThreeAdditional) {
            throw new NotFoundException('Step Three Additional not found');
        }
        const updatedIsActive = { ...patchDto, is_active: !existingStepThreeAdditional.is_active };
        const updatedStepThreeAdditional = await this.stepThreeRepository.patchStepThreeAdditionalIsActive(id, updatedIsActive);
        return updatedStepThreeAdditional;
    }
}
