import { Injectable } from "@nestjs/common";
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

    async getStepOneByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewStepOne | null> {
        return this.stepOneRepository.findOne({
            where: {
                vehicle_service_review_id: vehicleServiceReviewId,
            },
        });
    }
    async createStepOne(createDto: CreateStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const stepOne = this.stepOneRepository.create(createDto);
        return this.stepOneRepository.save(stepOne);
    }
    async updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const stepOne = await this.stepOneRepository.findOne({ where: { id } });
        if (!stepOne) {
            throw new Error('Step One not found');
        }
        Object.assign(stepOne, updateDto);
        return this.stepOneRepository.save(stepOne);
    }
    async patchIsActiveStepOne(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const stepOne = await this.stepOneRepository.findOne({ where: { id } });
        if (!stepOne) {
            throw new Error('Step One not found');
        }
        Object.assign(stepOne, patchDto);
        return this.stepOneRepository.save(stepOne);
    }
    async patchSuccessFlagStepOne(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const stepOne = await this.stepOneRepository.findOne({ where: { id } });
        if (!stepOne) {
            throw new Error('Step One not found');
        }
        Object.assign(stepOne, patchDto);
        return this.stepOneRepository.save(stepOne);
    }
    async createStepOneAdditional(createDto: CreateStepOneAdditionalDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const stepOneAdditional = this.stepOneAdditionalRepository.create(createDto);
        return this.stepOneAdditionalRepository.save(stepOneAdditional);
    }
    async updateStepOneAdditional(id: string, updateDto: UpdateStepOneDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const stepOneAdditional = await this.stepOneAdditionalRepository.findOne({ where: { id } });
        if (!stepOneAdditional) {
            throw new Error('Step One Additional not found');
        }
        Object.assign(stepOneAdditional, updateDto);
        return this.stepOneAdditionalRepository.save(stepOneAdditional);
    }
    async patchIsActiveStepOneAdditional(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const stepOneAdditional = await this.stepOneAdditionalRepository.findOne({ where: { id } });
        if (!stepOneAdditional) {
            throw new Error('Step One Additional not found');
        }
        Object.assign(stepOneAdditional, patchDto);
        return this.stepOneAdditionalRepository.save(stepOneAdditional);
    }
    async patchSuccessFlagStepOneAdditional(id: string, patchDto: PatchStepOneDto): Promise<VehicleServiceReviewStepOneAdditional> {
        const stepOneAdditional = await this.stepOneAdditionalRepository.findOne({ where: { id } });
        if (!stepOneAdditional) {
            throw new Error('Step One Additional not found');
        }
        Object.assign(stepOneAdditional, patchDto);
        return this.stepOneAdditionalRepository.save(stepOneAdditional);
    }
}