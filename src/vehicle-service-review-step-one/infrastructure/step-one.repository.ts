import { Injectable } from "@nestjs/common";
import type { IStepOneRepositoryInterface } from "../domain/interfaces/step-one.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewStepOne } from "../domain/entities/vehicle-service-review-step-one.entity";
import { Repository } from "typeorm";
import { CreateStepOneDto } from "../interfaces/dtos/create-step-one.dto";

@Injectable()
export class StepOneRepository implements IStepOneRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewStepOne)
        private readonly repository: Repository<VehicleServiceReviewStepOne>,
    ) { }

    async getStepOneByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewStepOne | null> {
        return this.repository.findOne({
            where: {
                vehicle_service_review_id: vehicleServiceReviewId,
            },
        });
    }
    async createStepOne(createDto: CreateStepOneDto): Promise<VehicleServiceReviewStepOne> {
        const stepOne = this.repository.create(createDto);
        return this.repository.save(stepOne);
    }
}
