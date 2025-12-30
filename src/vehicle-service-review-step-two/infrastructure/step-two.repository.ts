import { Injectable, NotFoundException } from "@nestjs/common";
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

    async getStepTwoById(id: string): Promise<VehicleServiceReviewStepTwo | null> {
        const stepTwo = await this.stepTwoRepository.findOne({ where: { id } });
        return stepTwo;
    }

    async getStepTwoByReviewId(reviewId: string): Promise<VehicleServiceReviewStepTwo | null> {
        const stepTwo = await this.stepTwoRepository.findOne({ where: { vehicle_service_review_id: reviewId, is_active: true } });
        return stepTwo;
    }

    async createStepTwo(createDto: CreateStepTwoDto): Promise<VehicleServiceReviewStepTwo> {
        const stepTwo = this.stepTwoRepository.create(createDto);
        return this.stepTwoRepository.save(stepTwo);
    }

    async createStepTwos(createDtos: CreateStepTwoDto[]): Promise<VehicleServiceReviewStepTwo[]> {
        const stepTwos = this.stepTwoRepository.create(createDtos);
        return this.stepTwoRepository.save(stepTwos);
    }

    async updateStepTwo(id: string, updateDto: UpdateStepTwoDto): Promise<VehicleServiceReviewStepTwo> {
        const existingStepTwo = await this.stepTwoRepository.findOne({ where: { id, is_active: true } });
        if (!existingStepTwo) {
            throw new NotFoundException(`Step Two ${id} not found`);
        }
        const updatedStepTwo = Object.assign(existingStepTwo, updateDto);
        return this.stepTwoRepository.save(updatedStepTwo);
    }

    async patchStepTwoIsActive(id: string, patchDto:PatchStepTwoDto): Promise<VehicleServiceReviewStepTwo> {
        const result = await this.stepTwoRepository.update(id, patchDto);
        if(result.affected === 0) {
            throw new NotFoundException(`Step Two ${id} not found`);
        }
        const updatedEntity = await this.stepTwoRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException(`Step Two ${id} not found after update`);
        }
        return updatedEntity;
    }
    async patchStepTwoSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwo> {
        const result = await this.stepTwoRepository.update(id, patchDto);
        if(result.affected === 0) {
            throw new NotFoundException(`Step Two ${id} not found`);
        }
        const updatedEntity = await this.stepTwoRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException(`Step Two ${id} not found after update`);
        }
        return updatedEntity;
    }

    async getStepTwoAdditionalById(id: string): Promise<VehicleServiceReviewStepTwoAdditional | null> {
        const stepTwoAdditional = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        return stepTwoAdditional;
    }

    async getStepTwoAdditionalByStepTwoId(stepTwoId: string): Promise<VehicleServiceReviewStepTwoAdditional | null> {
        const stepTwoAdditional = await this.stepTwoAdditionalRepository.findOne({ where: { vehicle_service_review_step_two_id: stepTwoId, is_active: true } });
        return stepTwoAdditional;
    }

    async createStepTwoAdditional(createDto: CreateStepTwoAdditionalDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        const stepTwoAdditionalEntity = this.stepTwoAdditionalRepository.create(createDto);
        return this.stepTwoAdditionalRepository.save(stepTwoAdditionalEntity);
    }
    async updateStepTwoAdditional(id: string, updateDto: UpdateStepTwoAdditionalDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        await this.stepTwoAdditionalRepository.update(id, updateDto);
        const updatedEntity = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException('Step Two Additional entity not found');
        }
        return updatedEntity;
    }
    async patchStepTwoAdditionalIsActive(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        const result = await this.stepTwoAdditionalRepository.update(id, { is_active: patchDto.is_active });
        if (result.affected === 0) {
            throw new NotFoundException('Step Two Additional entity not found');
        }
        const updatedEntity = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException('Step Two Additional entity not found after update');
        }
        return updatedEntity;
    }
    async patchStepTwoAdditionalSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<VehicleServiceReviewStepTwoAdditional> {
        const result = await this.stepTwoAdditionalRepository.update(id, { success_flag: patchDto.success_flag });
        if (result.affected === 0) {
            throw new NotFoundException('Step Two Additional entity not found');
        }
        const updatedEntity = await this.stepTwoAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException('Step Two Additional entity not found after update');
        }
        return updatedEntity;
    }
}
