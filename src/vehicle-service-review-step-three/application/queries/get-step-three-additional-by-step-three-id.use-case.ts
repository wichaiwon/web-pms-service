import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";

@Injectable()
export class GetStepThreeAdditionalByStepThreeIdUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) { }

    async execute(stepThreeId: string): Promise<StepThreeAdditionalDto | null> {
        const existingStepThree = await this.stepThreeRepository.getStepThreeAdditionalByStepThreeId(stepThreeId);
        if (!existingStepThree) {
            throw new NotFoundException(`Step Three Additional with Step Three ID: ${stepThreeId} not found.`);
        }
        return existingStepThree;
    }
}
