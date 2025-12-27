import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";

@Injectable()
export class CreateDetailsUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) {}

    async execute(createDto: CreateDetailDto[]): Promise<DetailDto[]> {
        // ต้องเช็คทุกตัวก่อนว่ามีตัวไหนซ้ำไหม
        for (const dto of createDto) {
            const existingActive = await this.detailRepository.getDetailByReviewId(dto.vehicle_service_review_id);
            if (existingActive) {
                throw new ConflictException(`Detail already exists for vehicle service review ID: ${dto.vehicle_service_review_id}.`);
            }
        }
        const createdDetails: VehicleServiceReviewDetail[] = [];
        for (const dto of createDto) {
            const createdDetail = await this.detailRepository.createDetail(dto);
            createdDetails.push(createdDetail);
        }
        return createdDetails;
    }
}
