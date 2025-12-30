import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { PatchStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/patch-step-three.dto";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";

@Injectable()
export class PatchStepThreeIsActiveUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface,
    ) { }
    async execute(id: string,patchDto:PatchStepThreeDto): Promise<StepThreeDto> {
        const existingStepThree =  await this.stepThreeRepository.getStepThreeById(id);
        if (!existingStepThree) {
            throw new NotFoundException(`Step Three with ID: ${id} not found.`);
        }
        const updatedIsActive = { ...patchDto, is_active: !existingStepThree.is_active };
        const updatedStepThree = await this.stepThreeRepository.patchStepThreeIsActive(id, updatedIsActive);
        return updatedStepThree;
    }
}
