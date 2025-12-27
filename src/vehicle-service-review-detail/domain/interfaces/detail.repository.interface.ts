import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { VehicleServiceReviewDetail } from "../entities/detail.entity";
import { UpdateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";


export interface IDetailRepositoryInterface {
    getDetailById(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetail | null>;
    createDetail(createDto: CreateDetailDto): Promise<VehicleServiceReviewDetail>;
    createDetails(createDto: CreateDetailDto[]): Promise<VehicleServiceReviewDetail[]>;
    updateDetail(id: string, updateDto: UpdateDetailDto): Promise<VehicleServiceReviewDetail>;
    patchSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<VehicleServiceReviewDetail>;
    patchIsActive(id: string, patchDto: PatchDetailDto): Promise<VehicleServiceReviewDetail>;
}
