import { Injectable } from "@nestjs/common";
import { CreateVehicleServiceReviewDetailUseCase } from "./commands/create-vehicle-service-review-detail.use-case";
import type { IVehicleServiceReviewDetailServiceInterface } from "../domain/interfaces/vehicle-service-review-detail.service.interface";
import { CreateVehicleServiceReviewDetailDto } from "../interfaces/dtos/create-vehicle-service-review-detail.dto";
import { CreateVehicleServiceReviewDetailsUseCase } from "./commands/create-vehicle-service-review-details.use-case";
import { VehicleServiceReviewDetailDto } from "../interfaces/dtos/vehicle-service-review-detail.dto";

@Injectable()
export class VehicleServiceReviewDetailService implements IVehicleServiceReviewDetailServiceInterface {
    constructor(
        private readonly createVehicleServiceReviewDetailUseCase: CreateVehicleServiceReviewDetailUseCase,
        private readonly createVehicleServiceReviewDetailsUseCase: CreateVehicleServiceReviewDetailsUseCase,
    ) { }
    async createVehicleServiceReviewDetail(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto> {
        return this.createVehicleServiceReviewDetailUseCase.execute(createDto);
    }
    async createVehicleServiceReviewDetails(createDto: CreateVehicleServiceReviewDetailDto[]): Promise<VehicleServiceReviewDetailDto[]> {
        return this.createVehicleServiceReviewDetailsUseCase.execute(createDto);
    }
}
