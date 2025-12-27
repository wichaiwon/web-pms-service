import { Inject, Injectable } from "@nestjs/common";
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
        return this.detailRepository.patchAdditionalSuccessFlag(id, patchDto);
    }
}
