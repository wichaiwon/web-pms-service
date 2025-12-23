import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class CreateVehicleServiceReviewsUseCase {
    private readonly MAX_BULK_SIZE = 100;

    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) {}

    async execute(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReviewDto[]> {
        // Validate bulk size
        if (createDtos.length === 0) {
            throw new BadRequestException('Cannot create empty array of records');
        }

        if (createDtos.length > this.MAX_BULK_SIZE) {
            throw new BadRequestException(`Cannot create more than ${this.MAX_BULK_SIZE} records at once`);
        }

        // Bulk insert
        return this.vehicleServiceReviewRepository.createVehicleServiceReviews(createDtos);
    }
}
