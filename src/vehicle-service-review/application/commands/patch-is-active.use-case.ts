import { Inject, Injectable } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class PatchIsActiveUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }
    async execute(id:string , patchDto:PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        return await this.vehicleServiceReviewRepository.patchIsActive(id, patchDto);
    }
}
