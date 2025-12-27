import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class CancelVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }
    async execute(id: string, patchDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        // ยกเลิก review (set is_active=false)
        const review = await this.vehicleServiceReviewRepository.patchIsActive(id, patchDto);
        
        if (review) {
            // ดึง detail และ set is_active=false ด้วย
            const detail = await this.detailRepository.getDetailByReviewId(id);
            if (detail) {
                await this.detailRepository.patchIsActive(detail.id, patchDto);
            }
        }
        
        return review;
    }
}
