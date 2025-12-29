import { Injectable } from "@nestjs/common";
import { IStepFourRepositoryInterface } from "../domain/interfaces/step-four.repsitory.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepFour } from "../domain/entities/vehicle-service-review-step-four.entity";
import { Repository } from "typeorm";
import { CreateStepfourDto } from "../interfaces/dtos/create-step-four.dto";
import { UpdateStepfourDto } from "../interfaces/dtos/update-step-four.dto";
import { PatchStepfourDto } from "../interfaces/dtos/patch-step-four.dto";

@Injectable()
export class StepFourRepository implements IStepFourRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepFour)
        private readonly stepFourRepository: Repository<VehicleServiceReviewStepFour>,
    ) { }
    async getStepFourByReviewId(reviewId: string): Promise<VehicleServiceReviewStepFour | null> {
        return this.stepFourRepository.findOne({ where: { vehicle_service_review_id: reviewId } });
    }
    async createStepFour(createDto: CreateStepfourDto): Promise<any> {
        const stepFour = this.stepFourRepository.create(createDto);
        return this.stepFourRepository.save(stepFour);
    }
    async updateStepFour(id: string, updateDto: UpdateStepfourDto): Promise<VehicleServiceReviewStepFour> {
        await this.stepFourRepository.update(id, updateDto);
        const stepFour = await this.stepFourRepository.findOne({ where: { id } });
        return stepFour!;
    }
    async patchStepFourSuccessFlag(id: string, patchDto: PatchStepfourDto): Promise<VehicleServiceReviewStepFour> {
        await this.stepFourRepository.update(id, patchDto);
        const stepFour = await this.stepFourRepository.findOne({ where: { id } });
        return stepFour!;
    }
    async patchStepFourIsActive(id: string, patchDto: PatchStepfourDto): Promise<VehicleServiceReviewStepFour> {
        await this.stepFourRepository.update(id, patchDto);
        const stepFour = await this.stepFourRepository.findOne({ where: { id } });
        return stepFour!;
    }
}
