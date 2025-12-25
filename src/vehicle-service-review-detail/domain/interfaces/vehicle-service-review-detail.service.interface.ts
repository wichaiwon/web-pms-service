import { CreateVehicleServiceReviewDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-vehicle-service-review-detail.dto";
import { VehicleServiceReviewDetail } from "../entities/vehicle-service-review-detail.entity";

export interface IVehicleServiceReviewDetailServiceInterface {
 createVehicleServiceReviewDetail(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetail>;
}