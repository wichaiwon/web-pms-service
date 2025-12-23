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
        if(!id){
            throw new Error('Vehicle service review ID is required');
        }
        return await this.vehicleServiceReviewRepository.patchActiveStatus(id,patchDto);
    }
}
