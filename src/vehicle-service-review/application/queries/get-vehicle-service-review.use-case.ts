import { Inject, Injectable } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";
import { Branch } from "src/shared/enum/employee/employee.enum";

@Injectable()
export class GetVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }
    async executeAll(branch: Branch, is_active: boolean, date_booked: string): Promise<VehicleServiceReviewDto[]> {
        return this.vehicleServiceReviewRepository.getVehicleServiceReview(branch, is_active, date_booked);
    }
}