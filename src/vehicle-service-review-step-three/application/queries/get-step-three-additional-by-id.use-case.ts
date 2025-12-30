import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";

@Injectable()
export class GetStepThreeAdditionalByIdUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) { }

    async execute(id: string): Promise<StepThreeAdditionalDto | null> {
        const existingStepThree = await this.stepThreeRepository.getStepThreeAdditionalById(id);
        if (!existingStepThree) {
            throw new NotFoundException(`Step Three Additional with ID: ${id} not found.`);
        }
        return existingStepThree;
    }
}
