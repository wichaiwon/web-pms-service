import { Injectable } from "@nestjs/common";
import type { IStepTwoRepositoryInterface } from "../domain/interfaces/step-two.repository.inface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepTwo } from "../domain/entities/vehicle-service-review-step-two.entity";
import { Repository } from "typeorm";
import { CreateStepTwoDto } from "../interfaces/dtos/create-step-two.dto";
import { UpdateStepTwoDto } from "../interfaces/dtos/update-step-two.dto";
import { VehicleServiceReviewStepTwoAdditional } from "../domain/entities/vehicle-service-review-step-two-additional.entity";
import { CreateStepTwoAdditionalDto } from "../interfaces/dtos/create-step-two-additional.dto";
import { PatchStepTwoDto } from "../interfaces/dtos/patch-step-two.dto";
import { UpdateStepTwoAdditionalDto } from "../interfaces/dtos/update-step-two-additional.dto";

@Injectable()
export class StepTwoRepository implements IStepTwoRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepTwo)
        private readonly stepTwoRepository: Repository<VehicleServiceReviewStepTwo>,
        @InjectRepository(VehicleServiceReviewStepTwoAdditional)
        private readonly stepTwoAdditionalRepository: Repository<VehicleServiceReviewStepTwoAdditional>,
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
        const updatedEntity = await this.stepTwoRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new Error('Step Two entity not found');
        }
        return updatedEntity;
    }
    async patchIsActiveStepTwo(id: string, patchDto: { is_active: boolean }): Promise<VehicleServiceReviewStepTwo> {
        await this.stepTwoRepository.update(id, patchDto);
        const updatedEntity = await this.stepTwoRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new Error('Step Two entity not found');
        }
        return updatedEntity;
    }
    async patchSuccessFlagStepTwo(id: string, patchDto: { success_flag: boolean }): Promise<VehicleServiceReviewStepTwo> {
        await this.stepTwoRepository.update(id, patchDto);
        const updatedEntity = await this.stepTwoRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new Error('Step Two entity not found');
        }
        return updatedEntity;
    }
    async createStepTwoAdditional(createDto: CreateStepTwoAdditionalDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        const stepTwoAdditionalEntity = this.stepTwoAdditionalRepository.create(createDto);
        return this.stepTwoAdditionalRepository.save(stepTwoAdditionalEntity);
    }
    async updateStepTwoAdditional(id: string, updateDto: UpdateStepTwoAdditionalDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        await this.stepTwoAdditionalRepository.update(id, updateDto);
        const updatedEntity = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new Error('Step Two Additional entity not found');
        }
        return updatedEntity;
    }
    async patchStepTwoAdditionalIsActive(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        await this.stepTwoAdditionalRepository.update(id, { is_active: patchDto.is_active });
        const updatedEntity = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new Error('Step Two Additional entity not found');
        }
        return updatedEntity;
    }
    async patchStepTwoAdditionalSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        await this.stepTwoAdditionalRepository.update(id, { success_flag: patchDto.success_flag });
        const updatedEntity = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new Error('Step Two Additional entity not found');
        }
        return updatedEntity;
    }
}
