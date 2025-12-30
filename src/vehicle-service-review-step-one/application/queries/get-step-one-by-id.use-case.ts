import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";

@Injectable()
export class GetStepOneByIdUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string): Promise<StepOneDto | null> {
        const stepOne = await this.stepOneRepository.getStepOneById(id);
        if (!stepOne) {
            throw new Error(`Step One with ID ${id} not found.`);
        }
        return stepOne;
    }
}
