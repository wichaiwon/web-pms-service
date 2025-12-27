import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { VehicleServiceReviewDetail } from "../entities/vehicle-service-review-detail.entity";
import { UpdateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";
import { CreateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail-additional.dto";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";
import { UpdateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail-additional.dto";


export interface IDetailRepositoryInterface {
    getDetailByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetail | null>;
    createDetail(createDto: CreateDetailDto): Promise<VehicleServiceReviewDetail>;
    createDetails(createDto: CreateDetailDto[]): Promise<VehicleServiceReviewDetail[]>;
    updateDetail(id: string, updateDto: UpdateDetailDto): Promise<VehicleServiceReviewDetail>;
    patchSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<VehicleServiceReviewDetail>;
    patchIsActive(id: string, patchDto: PatchDetailDto): Promise<VehicleServiceReviewDetail>;
    createDetailAdditional(createDto:CreateDetailAdditionalDto): Promise<DetailAdditionalDto>;
    updateDetailAdditional(id: string, updateDto: UpdateDetailAdditionalDto): Promise<DetailAdditionalDto>;
    patchAdditionalIsActive(id: string, patchDto: PatchDetailDto): Promise<DetailAdditionalDto>;
    patchAdditionalSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<DetailAdditionalDto>;
}
