import { Inject, Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "src/vehicle-service-review-step-two/domain/interfaces/step-two.repository.inface";
import { StepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/step-two-additional.dto";
import { UpdateStepTwoAdditionalDto } from "src/vehicle-service-review-step-two/interfaces/dtos/update-step-two-additional.dto";

@Injectable()
export class UpdateStepTwoAdditionalUseCase {
    constructor(
        @Inject('IStepTwoRepository')
        private readonly stepTwoAdditionalRepository: IStepTwoRepositoryInterface,
    ) { }
    async execute(id: string, updateDto: UpdateStepTwoAdditionalDto): Promise<StepTwoAdditionalDto> {
        return this.stepTwoAdditionalRepository.updateStepTwoAdditional(id, updateDto);
    }
}
