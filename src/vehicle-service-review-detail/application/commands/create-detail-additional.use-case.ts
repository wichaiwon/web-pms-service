import { ConflictException, Inject, Injectable } from "@nestjs/common";
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
        const existingDetailAdditional = await this.detailAdditionalRepository.getAdditionalByDetailId(createDto.vehicle_service_review_detail_id);
        if (existingDetailAdditional) {
            throw new ConflictException(`Detail Additional with ID ${createDto.vehicle_service_review_detail_id} already exists.`);
        }
        const newDetailAdditional = await this.detailAdditionalRepository.createDetailAdditional(createDto);
        return newDetailAdditional;
    }
}
