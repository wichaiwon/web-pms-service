import { CreateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail-additional.dto";
import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";
import { UpdateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail-additional.dto";
import { UpdateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail.dto";

export interface IDetailServiceInterface {
    createDetail(createDto: CreateDetailDto): Promise<DetailDto>;
    createDetails(createDto: CreateDetailDto[]): Promise<DetailDto[]>;
    updateDetail(id: string, updateDto: UpdateDetailDto): Promise<DetailDto>;
    patchSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<DetailDto>;
    patchIsActive(id: string, patchDto: PatchDetailDto): Promise<DetailDto>;
    createDetailAdditional(createDto: CreateDetailAdditionalDto): Promise<DetailAdditionalDto>;
    updateDetailAdditional(id: string, updateDto: UpdateDetailAdditionalDto): Promise<DetailAdditionalDto>;
}
