import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two-additional.dto";

@Injectable()
export class GetStepTwoAdditionalByIdUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}
    async execute(id: string): Promise<StepTwoAdditionalDto | null> {
        const existingStepTwo =  await this.stepTwoRepository.getStepTwoAdditionalById(id);
        if (!existingStepTwo) {
         throw new NotFoundException(`Step Two Additional with ID ${id} not found.`);
        }
        return existingStepTwo;
    }
}
