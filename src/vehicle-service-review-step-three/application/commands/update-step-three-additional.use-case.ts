import { Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { StepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three-additional.dto";
import { UpdateStepThreeAdditionalDto } from "src/vehicle-service-review-step-three/interfaces/dtos/update-step-three-additional.dto";

@Injectable()
export class UpdateStepThreeAdditionalUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeAdditionalRepository: IStepThreeRepositoryInterface,
    ) { }

    async execute(id: string, updateDto:UpdateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeAdditionalRepository.updateStepThreeAdditional(id, updateDto);
    }
}
