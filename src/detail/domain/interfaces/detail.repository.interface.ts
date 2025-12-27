import { CreateDetailDto } from "src/detail/interfaces/dtos/create-detail.dto";
import { Detail } from "../entities/detail.entity";
import { UpdateDetailDto } from "src/detail/interfaces/dtos/update-detail.dto";
import { PatchDetailDto } from "src/detail/interfaces/dtos/patch-detail.dto";

export interface IDetailRepositoryInterface {
    getDetailById(vehicleServiceReviewId: string): Promise<Detail | null>;
    createDetail(createDto: CreateDetailDto): Promise<Detail>;
    createDetails(createDto: CreateDetailDto[]): Promise<Detail[]>;
    updateDetail(id: string, updateDto: UpdateDetailDto): Promise<Detail>;
    patchSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<Detail>;
    patchIsActive(id: string, patchDto: PatchDetailDto): Promise<Detail>;
}
