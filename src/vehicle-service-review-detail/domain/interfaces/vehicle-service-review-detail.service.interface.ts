import { CreateVehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-vehicle-service-review-detail.dto";
import { VehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/vehicle-service-review-detail.dto";

export interface IVehicleServiceReviewDetailServiceInterface {
    createVehicleServiceReviewDetail(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto>;
    createVehicleServiceReviewDetails(createDto: CreateVehicleServiceReviewDetailDto[]): Promise<VehicleServiceReviewDetailDto[]>;
}