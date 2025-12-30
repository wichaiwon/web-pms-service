import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";


@Injectable()
export class PatchSuccessFlagUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }

    async execute(id: string, patchDto: PatchDetailDto): Promise<DetailDto> {
        const existingDetail = await this.detailRepository.getDetailById(id);
        if (!existingDetail) {
            throw new Error(`Detail with ID ${id} not found.`);
        }
        const updatedSuccessFlag = { ...patchDto, success_flag: !existingDetail.success_flag };
        const updatedDetail = await this.detailRepository.patchSuccessFlag(id, updatedSuccessFlag);
        return updatedDetail;
    }
}
