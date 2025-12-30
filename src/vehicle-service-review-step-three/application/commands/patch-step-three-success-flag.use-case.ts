import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { PatchStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/patch-step-three.dto";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";

@Injectable()
export class PatchStepThreeSuccessFlagUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) { }
    async execute(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        const existingStepThree = await this.stepThreeRepository.getStepThreeById(id);
        if (!existingStepThree) {
            throw new NotFoundException('Step Three not found');
        }
        const updatedIsActive ={ ...patchDto, success_flag: !existingStepThree.success_flag };
        const updatedStepThree = await this.stepThreeRepository.patchStepThreeSuccessFlag(id, updatedIsActive);
        return updatedStepThree;
    }
}
