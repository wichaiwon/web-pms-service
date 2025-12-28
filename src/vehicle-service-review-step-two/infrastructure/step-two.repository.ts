import { Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "../domain/interfaces/step-two.repository.inface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepTwo } from "../domain/entities/vehicle-service-review-step-two.entity";
import { Repository } from "typeorm";
import { CreateStepTwoDto } from "../interfaces/dtos/create-step-two.dto";
import { StepTwoDto } from "../interfaces/dtos/step-two.dto";
import { UpdateStepTwoDto } from "../interfaces/dtos/update-step-two.dto";

@Injectable()
export class StepTwoRepository implements IStepTwoRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepTwo)
        private readonly stepTwoRepository: Repository<VehicleServiceReviewStepTwo>,
    ) { }
    async createStepTwo(createDto: CreateStepTwoDto): Promise<VehicleServiceReviewStepTwo> {
        const stepTwo = this.stepTwoRepository.create(createDto);
        return this.stepTwoRepository.save(stepTwo);
    }
    async getStepTwoByReviewId(reviewId: string): Promise<VehicleServiceReviewStepTwo | null> {
        return this.stepTwoRepository.findOne({ where: { vehicle_service_review_id: reviewId } });
    }
    async updateStepTwo(id: string, updateDto: UpdateStepTwoDto): Promise<VehicleServiceReviewStepTwo> {
        await this.stepTwoRepository.update(id, updateDto);
        return this.stepTwoRepository.findOne({ where: { id } }) as Promise<VehicleServiceReviewStepTwo>;
    }
    async patchIsActiveStepTwo(id: string, patchDto: { is_active: boolean }): Promise<VehicleServiceReviewStepTwo> {
        await this.stepTwoRepository.update(id, patchDto);
        return this.stepTwoRepository.findOne({ where: { id } }) as Promise<VehicleServiceReviewStepTwo>;
    }
    async patchSuccessFlagStepTwo(id: string, patchDto: { success_flag: boolean }): Promise<VehicleServiceReviewStepTwo> {
        await this.stepTwoRepository.update(id, patchDto);
        return this.stepTwoRepository.findOne({ where: { id } }) as Promise<VehicleServiceReviewStepTwo>;
    }
}
