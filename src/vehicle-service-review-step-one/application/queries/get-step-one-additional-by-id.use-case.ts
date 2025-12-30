import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";

@Injectable()
export class GetStepOneAdditionalByIdUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) {}

    async execute(id: string): Promise<StepOneAdditionalDto | null> {
        const additional = await this.stepOneRepository.getStepOneAdditionalById(id);
        if (!additional) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        return additional;
    }
}
