import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";

@Injectable()
export class PatchDetailAdditionalSuccessFlagUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }
    async execute(id: string, patchDto:PatchDetailDto): Promise<DetailAdditionalDto> {
        const existingDetailAdditional = await this.detailRepository.getAdditionalById(id);
        if (!existingDetailAdditional) {
            throw new NotFoundException(`Detail Additional with ID ${id} not found.`);
        }
        const updatedSuccessFlag = { ...patchDto, success_flag: !existingDetailAdditional.success_flag };
        const updatedDetailAdditional = await this.detailRepository.patchAdditionalSuccessFlag(id, updatedSuccessFlag);
        return updatedDetailAdditional;
    }
}
