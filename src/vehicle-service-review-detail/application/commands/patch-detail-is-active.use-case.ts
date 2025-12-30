import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";

@Injectable()
export class PatchIsActiveUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }

    async execute(id: string, patchDto: PatchDetailDto): Promise<DetailDto> {
        const existingDetail = await this.detailRepository.getDetailById(id);
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const updatedIsActive = { ...patchDto, is_active: !existingDetail.is_active };
        const updatedDetail = await this.detailRepository.patchIsActive(id, updatedIsActive);
        return updatedDetail;
    }
}
