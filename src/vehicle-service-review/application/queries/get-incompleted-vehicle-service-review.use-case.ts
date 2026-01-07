import { Inject, Injectable } from "@nestjs/common";
import { Branch } from "src/shared/enum/employee/employee.enum";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class GetIncompleteVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }

    async execute(branch: Branch): Promise<VehicleServiceReviewDto[]> {
        const is_active = true;
        const date_booked = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
        return this.vehicleServiceReviewRepository.getIncompleteVehicleServiceReview(branch, is_active, date_booked);
    }
}
