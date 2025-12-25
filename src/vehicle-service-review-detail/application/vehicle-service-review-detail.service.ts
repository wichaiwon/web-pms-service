import { Injectable } from "@nestjs/common";
import { CreateVehicleServiceReviewDetailUseCase } from "./commands/create-vehicle-service-review-detail.use-case";
import type { IVehicleServiceReviewDetailServiceInterface } from "../domain/interfaces/vehicle-service-review-detail.service.interface";
import { VehicleServiceReviewDetail } from "../domain/entities/vehicle-service-review-detail.entity";
import { CreateVehicleServiceReviewDetailDto } from "../interfaces/dtos/create-vehicle-service-review-detail.dto";

@Injectable()
export class VehicleServiceReviewDetailService implements IVehicleServiceReviewDetailServiceInterface {
    constructor(
        private readonly createVehicleServiceReviewDetailUseCase: CreateVehicleServiceReviewDetailUseCase,
    ) { }
    async createVehicleServiceReviewDetail(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetail> {        
        return this.createVehicleServiceReviewDetailUseCase.execute(createDto);
    }
}
