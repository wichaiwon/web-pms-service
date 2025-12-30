import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";

@Injectable()
export class GetStepTwoByIdUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) { }
    async execute(id: string): Promise<StepTwoDto | null> {
        const existingStepTwo =  await this.stepTwoRepository.getStepTwoById(id);
        if (!existingStepTwo) {
         throw new NotFoundException(`Step Two with ID ${id} not found.`);
        }
        return existingStepTwo;
    }
}
