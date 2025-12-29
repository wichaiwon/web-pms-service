import { Injectable } from "@nestjs/common";
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
    async getStepThreeByReviewId(reviewId: string): Promise<VehicleServiceReviewStepThree | null> {
        return await this.stepThreeRepository.findOne({
            where: {
                vehicle_service_review_id: reviewId,
            },
        });
    }
    async createStepThree(createDto: CreateStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        const stepThreeEntity = this.stepThreeRepository.create(createDto);
        return await this.stepThreeRepository.save(stepThreeEntity);
    }
    async updateStepThree(id: string, updateDto: UpdateStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        await this.stepThreeRepository.update(id, updateDto);
        const updatedEntity = await this.stepThreeRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new Error('Step Three entity not found after update');
        }
        return updatedEntity;
    }
    async patchStepThreeIsActive(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        await this.stepThreeRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new Error('Step Three entity not found after patch');
        }
        return updatedEntity;
    }
    async patchStepThreeSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThree> {
        await this.stepThreeRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new Error('Step Three entity not found after patch');
        }
        return updatedEntity;
    }
    async createStepThreeAdditional(createDto: CreateStepThreeAdditionalDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        const stepThreeAdditionalEntity = this.stepThreeAdditionalRepository.create(createDto);
        return await this.stepThreeAdditionalRepository.save(stepThreeAdditionalEntity);
    }
    async updateStepThreeAdditional(id: string, updateDto: UpdateStepThreeAdditionalDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        await this.stepThreeAdditionalRepository.update(id, updateDto);
        const updatedEntity = await this.stepThreeAdditionalRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new Error('Step Three Additional entity not found after update');
        }
        return updatedEntity;
    }
    async patchStepThreeAdditionalIsActive(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        await this.stepThreeAdditionalRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeAdditionalRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new Error('Step Three Additional entity not found after patch');
        }
        return updatedEntity;
    }
    async patchStepThreeAdditionalSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<VehicleServiceReviewStepThreeAdditional> {
        await this.stepThreeAdditionalRepository.update(id, patchDto);
        const updatedEntity = await this.stepThreeAdditionalRepository.findOne({
            where: { id },
        });
        if (!updatedEntity) {
            throw new Error('Step Three Additional entity not found after patch');
        }
        return updatedEntity;
    }
}