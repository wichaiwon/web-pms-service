import { Inject, Injectable } from "@nestjs/common";
import type { IStepFourRepositoryInterface } from "src/vehicle-service-review-step-four/domain/interfaces/step-four.repsitory.interface";
import { StepFourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/step-four.dto";
import { UpdateStepfourDto } from "src/vehicle-service-review-step-four/interfaces/dtos/update-step-four.dto";

@Injectable()
export class UpdateStepFourUseCase {
 constructor(
    @Inject('IStepFourRepository')
    private readonly stepFourRepository: IStepFourRepositoryInterface,
 ) { }
    async execute(id: string, updateDto:UpdateStepfourDto): Promise<StepFourDto> { 
        return this.stepFourRepository.updateStepFour(id, updateDto);
    }
}
