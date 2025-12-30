import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";

@Injectable()
export class GetStepFourByIdUseCase {
    constructor(
        @Inject('IStepFourRepository')
        private readonly stepFourRepository: IStepFourRepositoryInterface,
    ) { }

    async execute(id: string): Promise<StepFourDto | null> {
        const existingStepFour = await this.stepFourRepository.getStepFourById(id);
        if (!existingStepFour) {
            throw new NotFoundException(`Step Four for ID ${id} not found`);
        }
        return existingStepFour;
    }
}
