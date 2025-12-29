import { Inject, Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "src/vehicle-service-review-step-three/domain/interfaces/step-three.repository.interface";
import { StepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/step-three.dto";
import { UpdateStepThreeDto } from "src/vehicle-service-review-step-three/interfaces/dtos/update-step-three.dto";

@Injectable()
export class UpdateStepThreeUseCase {
    constructor(
        @Inject('IStepThreeRepository')
        private readonly stepThreeRepository: IStepThreeRepositoryInterface,
    ) { }
    async execute(id: string, updateDto: UpdateStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeRepository.updateStepThree(id, updateDto);
    }
}
