import { Injectable } from "@nestjs/common";
import type { IStepThreeRepositoryInterface } from "../domain/interfaces/step-three.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepThree } from "../domain/entities/vehicle-service-review-step-three.entity";
import { Repository } from "typeorm";
import { CreateStepThreeDto } from "../interfaces/dtos/create-step-three.dto";
import { UpdateStepThreeDto } from "../interfaces/dtos/update-step-three.dto";
import { PatchStepThreeDto } from "../interfaces/dtos/patch-step-three.dto";

@Injectable()
export class stepThreeRepository implements IStepThreeRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepThree)
        private readonly stepThreeRepository: Repository<VehicleServiceReviewStepThree>,
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
}