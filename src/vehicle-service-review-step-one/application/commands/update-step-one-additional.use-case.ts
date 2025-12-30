import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";
import { UpdateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one-additional.dto";

@Injectable()
export class UpdateStepOneAdditionalUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneAdditionalRepository: IStepOneRepositoryInterface
        ,
    ) { }
    async execute(id: string, updateDto: UpdateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        const existingStepOneAdditional = await this.stepOneAdditionalRepository.getStepOneAdditionalById(id);
        if (!existingStepOneAdditional) {
            throw new Error(`Step One Additional with ID ${id} not found.`);
        }
        const updatedStepOneAdditional = await this.stepOneAdditionalRepository.updateStepOneAdditional(id, updateDto);
        return updatedStepOneAdditional;
    }
}
