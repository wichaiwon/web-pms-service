import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { CreateStepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one-additional.dto";
import { StepOneAdditionalDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one-additional.dto";

@Injectable()
export class CreateStepOneAdditionalUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneAdditionalRepository: IStepOneRepositoryInterface,
    ) { }
    async execute(createDto: CreateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        const existingStepOne = await this.stepOneAdditionalRepository.getStepOneAdditionalByStepOneId(createDto.vehicle_service_review_step_one_id);
        if (existingStepOne) {
            throw new ConflictException(`Step One Additional for Step One ID ${createDto.vehicle_service_review_step_one_id} already exists.`);
        }
        return await this.stepOneAdditionalRepository.createStepOneAdditional(createDto);
    }
}
