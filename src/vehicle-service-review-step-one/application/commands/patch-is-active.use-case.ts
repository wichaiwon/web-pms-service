import { Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { PatchStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/patch-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";

@Injectable()
export class PatchIsActiveStepOneUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        return await this.stepOneRepository.patchIsActiveStepOne(id, patchDto);
    }
}
