import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";
import { UpdateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail-additional.dto";

@Injectable()
export class UpdateDetailAdditionalUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) {}
    async execute(id: string, updateDto: UpdateDetailAdditionalDto): Promise<DetailAdditionalDto> {
        return this.detailRepository.updateDetailAdditional(id, updateDto);
    }
}
