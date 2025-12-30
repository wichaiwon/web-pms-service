import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";

@Injectable()
export class PatchDetailAdditionalIsActiveUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) {}
    async execute(id: string,patchDto:PatchDetailDto): Promise<DetailAdditionalDto> {
        const existingDetailAdditional = await this.detailRepository.getAdditionalById(id);
        if (!existingDetailAdditional) {
            throw new Error(`Detail Additional with ID ${id} not found.`);
        }
        const updatedIsActive = { ...patchDto, is_active: !existingDetailAdditional.is_active};
        const updatedDetailAdditional = await this.detailRepository.patchAdditionalIsActive(id, updatedIsActive);
        return updatedDetailAdditional;
    }
}
