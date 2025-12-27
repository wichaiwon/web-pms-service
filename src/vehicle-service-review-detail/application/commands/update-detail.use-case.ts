import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";
import { UpdateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail.dto";


@Injectable()
export class UpdateDetailUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }

    async execute(id: string, updateDto: UpdateDetailDto): Promise<DetailDto> {
        return await this.detailRepository.updateDetail(id, updateDto);
    }
}
