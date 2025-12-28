import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";
import { UpdateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/update-step-one.dto";

@Injectable()
export class UpdateStepOneUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id:string,updateDto: UpdateStepOneDto): Promise<StepOneDto> {
        return await this.stepOneRepository.updateStepOne(id, updateDto);
    }
}
