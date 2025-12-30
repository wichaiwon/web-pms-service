import { Injectable, NotFoundException } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "../domain/interfaces/step-one.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepOne } from "../domain/entities/vehicle-service-review-step-one.entity";
import { Repository } from "typeorm";
import { CreateStepOneDto } from "../interfaces/dtos/create-step-one.dto";
import { UpdateStepOneDto } from "../interfaces/dtos/update-step-one.dto";
import { PatchStepOneDto } from "../interfaces/dtos/patch-step-one.dto";
import { VehicleServiceReviewStepOneAdditional } from "../domain/entities/vehicle-service-review-step-one-additional.entity";
import { CreateStepOneAdditionalDto } from "../interfaces/dtos/create-step-one-additional.dto";

@Injectable()
export class StepOneRepository implements IStepOneRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepOne)
        private readonly stepOneRepository: Repository<VehicleServiceReviewStepOne>,
        @InjectRepository(VehicleServiceReviewStepOneAdditional)
        private readonly stepOneAdditionalRepository: Repository<VehicleServiceReviewStepOneAdditional>,
    ) { }

    async getStepOneById(id: string): Promise<VehicleServiceReviewStepOne | null> {
        return this.stepOneRepository.findOne({
            where: {
                id,
            },
        });
    }

    async getStepOneByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewStepOne | null> {
        return this.stepOneRepository.findOne({
            where: {
                vehicle_service_review_id: vehicleServiceReviewId,
                is_active: true,
            },
        });
    }
    async createStepOne(createDto: CreateStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const stepOne = this.stepOneRepository.create(createDto);
        return this.stepOneRepository.save(stepOne);
    }
    async createStepOnes(createDtos: CreateStepOneDto[]): Promise<VehicleServiceReviewStepOne[]> {
        const stepOnes = this.stepOneRepository.create(createDtos);
        return this.stepOneRepository.save(stepOnes);
    }

    async updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const existingStepOne = await this.stepOneRepository.findOne({ where: { id, is_active: true } });
        if (!existingStepOne) {
            throw new NotFoundException(`Step One with ID ${id} not found.`);
        }
        const updatedStepOne = Object.assign(existingStepOne, updateDto);
        return this.stepOneRepository.save(updatedStepOne);
    }
    async patchStepOneIsActive(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const result = await this.stepOneRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Step One with ID ${id} not found.`);
        }
        const updatedEntity = await this.stepOneRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException(`Step One with ID ${id} not found.`);
        }
        return updatedEntity;
    }
    async patchStepOneSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const result = await this.stepOneRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Step One with ID ${id} not found.`);
        }
        const updatedEntity = await this.stepOneRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException(`Step One with ID ${id} not found.`);
        }
        return updatedEntity;
    }
    async getStepOneAdditionalById(id: string): Promise<VehicleServiceReviewStepOneAdditional | null> {
        return this.stepOneAdditionalRepository.findOne({
            where: {
                id,
            },
        });
    }
    async getStepOneAdditionalByStepOneId(stepOneId: string): Promise<VehicleServiceReviewStepOneAdditional | null> {
        return this.stepOneAdditionalRepository.findOne({
            where: {
                vehicle_service_review_step_one_id: stepOneId,
                is_active: true,
            },
        });
    }

    async createStepOneAdditional(createDto: CreateStepOneAdditionalDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const stepOneAdditional = this.stepOneAdditionalRepository.create(createDto);
        return this.stepOneAdditionalRepository.save(stepOneAdditional);
    }

    async updateStepOneAdditional(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const existingStepOneAdditional = await this.stepOneAdditionalRepository.findOne({ where: { id, is_active: true } });
        if (!existingStepOneAdditional) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        const updatedStepOneAdditional = Object.assign(existingStepOneAdditional, updateDto);
        return this.stepOneAdditionalRepository.save(updatedStepOneAdditional);
    }
    async patchStepOneAdditionalIsActive(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const result = await this.stepOneAdditionalRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        const updatedEntity = await this.stepOneAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        return updatedEntity;
    }
    async patchStepOneAdditionalSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const result = await this.stepOneAdditionalRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        const updatedEntity = await this.stepOneAdditionalRepository.findOne({ where: { id } });
        if (!updatedEntity) {
            throw new NotFoundException(`Step One Additional with ID ${id} not found.`);
        }
        return updatedEntity;
    }
}