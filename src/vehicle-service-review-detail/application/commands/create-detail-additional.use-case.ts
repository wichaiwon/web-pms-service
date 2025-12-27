import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { CreateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail-additional.dto";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";

@Injectable()
export class CreateDetailAdditionalUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailAdditionalRepository: IDetailRepositoryInterface,
    ) { }

    async execute(createDto: CreateDetailAdditionalDto): Promise<DetailAdditionalDto> {
        return this.detailAdditionalRepository.createDetailAdditional(createDto);
    }
}
