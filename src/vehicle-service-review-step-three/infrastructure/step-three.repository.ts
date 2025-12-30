import { Injectable, NotFoundException } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "../domain/interfaces/step-three.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepThree } from "../domain/entities/vehicle-service-review-step-three.entity";
import { Repository } from "typeorm";
import { CreateStepThreeDto } from "../interfaces/dtos/create-step-three.dto";
import { UpdateStepThreeDto } from "../interfaces/dtos/update-step-three.dto";
import { PatchStepThreeDto } from "../interfaces/dtos/patch-step-three.dto";
import { CreateStepThreeAdditionalDto } from "../interfaces/dtos/create-step-three-additional.dto";
import { VehicleServiceReviewStepThreeAdditional } from "../domain/entities/vehicle-service-review-step-three-additional.entity";
import { UpdateStepThreeAdditionalDto } from "../interfaces/dtos/update-step-three-additional.dto";

@Injectable()
export class stepThreeRepository implements IStepThreeRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepThree)
        private readonly stepThreeRepository: Repository<VehicleServiceReviewStepThree>,
        @InjectRepository(VehicleServiceReviewStepThreeAdditional)
        private readonly stepThreeAdditionalRepository: Repository<VehicleServiceReviewStepThreeAdditional>,
    ) { }
    async getStepThreeById(id: string): Promise<VehicleServiceReviewStepThree | null> {
        const stepThree = await this.stepThreeRepository.findOne({
            where: {
                id,
            },
        });
        return stepThree;
    }
    async getStepThreeByReviewId(reviewId: string): Promise<VehicleServiceReviewStepThree | null> {
        return await this.stepThreeRepository.findOne({
            where: {
                vehicle_service_review_id: reviewId,
                is_active: true,
            },
        });
    }
    async createStepThree(createDto: CreateStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        const stepThreeEntity = this.stepThreeRepository.create(createDto);
        return await this.stepThreeRepository.save(stepThreeEntity);
    }
    async createStepThrees(createDtos: CreateStepThreeDto[]): Promise<VehicleServiceReviewStepThree[]> {
        const stepThreeEntities = this.stepThreeRepository.create(createDtos);
        return await this.stepThreeRepository.save(stepThreeEntities);
    }
    async updateStepThree(id: string, updateDto: UpdateStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        const result = await this.stepThreeRepository.update(id, updateDto);
        if (result.affected === 0) {
            throw new NotFoundException('Step Three entity not found for update');
        }
        const updatedEntity = await this.stepThreeRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new NotFoundException('Step Three entity not found after update');
        }
        return updatedEntity;
    }
    async patchStepThreeIsActive(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        await this.stepThreeRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new NotFoundException('Step Three entity not found after patch');
        }
        return updatedEntity;
    }
    async patchStepThreeSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        await this.stepThreeRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new NotFoundException('Step Three entity not found after patch');
        }
        return updatedEntity;
    }
    async getStepThreeAdditionalById(id: string): Promise<VehicleServiceReviewStepThreeAdditional | null> {
        const stepThreeAdditional = await this.stepThreeAdditionalRepository.findOne({
            where: {
                id,
            },
        });
        return stepThreeAdditional;
    }
    async getStepThreeAdditionalByStepThreeId(stepThreeId: string): Promise<VehicleServiceReviewStepThreeAdditional | null> {
        const stepThreeAdditional = await this.stepThreeAdditionalRepository.findOne({
            where: {
                vehicle_service_review_step_three_id: stepThreeId,
                is_active: true,
            },
        });
        return stepThreeAdditional;
    }

    async createStepThreeAdditional(createDto: CreateStepThreeAdditionalDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        const stepThreeAdditionalEntity = this.stepThreeAdditionalRepository.create(createDto);
        return await this.stepThreeAdditionalRepository.save(stepThreeAdditionalEntity);
    }
    async updateStepThreeAdditional(id: string, updateDto: UpdateStepThreeAdditionalDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        const result = await this.stepThreeAdditionalRepository.update(id, updateDto);
        if (result.affected === 0) {
            throw new NotFoundException('Step Three Additional entity not found for update');
        }
        const updatedEntity = await this.stepThreeAdditionalRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new NotFoundException('Step Three Additional entity not found after update');
        }
        return updatedEntity;
    }
    async patchStepThreeAdditionalIsActive(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        await this.stepThreeAdditionalRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeAdditionalRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new NotFoundException('Step Three Additional entity not found after patch');
        }
        return updatedEntity;
    }
    async patchStepThreeAdditionalSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        await this.stepThreeAdditionalRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeAdditionalRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new NotFoundException('Step Three Additional entity not found after patch');
        }
        return updatedEntity;
    }
}