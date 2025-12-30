import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";

@Injectable()
export class GetStepThreeByIdUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface
    ) { }
    async execute(id: string):Promise<StepThreeDto | null> {
        const existingStepThree = await this.stepThreeRepository.getStepThreeById(id);
        if (!existingStepThree) {
            throw new NotFoundException(`Step Three with ID: ${id} not found.`);
        }
        return existingStepThree;
    }
}
