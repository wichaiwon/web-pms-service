import { Injectable, Inject, ConflictException } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/detail/domain/interfaces/detail.repository.interface";
import { CreateDetailDto } from "src/detail/interfaces/dtos/create-detail.dto";
import { DetailDto } from "src/detail/interfaces/dtos/detail.dto";

@Injectable()
export class CreateDetailUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface
    ) {}

    async execute(createDto: CreateDetailDto): Promise<DetailDto> {
        const existingActive = await this.detailRepository.getDetailById(createDto.vehicle_service_review_id);
        if (existingActive) {
            throw new ConflictException('Detail already exists for this vehicle service review ID.');
        }
        return await this.detailRepository.createDetail(createDto);
    }
}
