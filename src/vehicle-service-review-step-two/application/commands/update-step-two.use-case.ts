import { Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two.dto";
import { UpdateStepTwoDto } from "src/vehicle-service-review-step-two/interfaces/dtos/update-step-two.dto";

@Injectable()
export class UpdateStepTwoUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoRepository: IStepTwoRepositoryInterface,
    ) {}
    async execute(id: string, updateDto:UpdateStepTwoDto): Promise<StepTwoDto> {
        return this.stepTwoRepository.updateStepTwo(id, updateDto);
    }
}
