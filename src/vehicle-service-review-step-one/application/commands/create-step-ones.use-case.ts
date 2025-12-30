import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { VehicleServiceReviewStepOne } from "src/vehicle-service-review-step-one/domain/entities/vehicle-service-review-step-one.entity";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";

@Injectable()
export class CreateStepOnesUseCase {
    constructor(
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }

    async execute(createDtos: CreateStepOneDto[]): Promise<VehicleServiceReviewStepOne[]> {
        for (const dto of createDtos) {
            const existingActive = await this.stepOneRepository.getStepOneByReviewId(dto.vehicle_service_review_id);
            if (existingActive) {
                throw new ConflictException(`Step One already exists for vehicle service review ID: ${dto.vehicle_service_review_id}.`);
            }
        }
        const createdStepOnes: VehicleServiceReviewStepOne[] = []
        for (const dto of createDtos) {
            const createdStepOne = await this.stepOneRepository.createStepOne(dto);
            createdStepOnes.push(createdStepOne);
        }
        return createdStepOnes;
    }
}
