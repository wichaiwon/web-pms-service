import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class ReIssueVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }

    async execute(id: string, patchDto:PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        // ดึง review ที่ต้องการ reissue (review ยัง active อยู่)
        const review = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(id);
        
        if (!review) {
            throw new Error('Vehicle service review not found');
        }
        
        // ดึง detail เก่ามา และ set is_active=false
        const oldDetail = await this.detailRepository.getDetailByReviewId(id);
        if (oldDetail) {
            await this.detailRepository.patchIsActive(oldDetail.id,patchDto);
        }
        // สร้าง detail ใหม่ที่เป็นค่า default (null ทั้งหมด)
        await this.detailRepository.createDetail({
            vehicle_service_review_id: id,
            created_by: patchDto.updated_by,
        });
        
        return review;
    }
}
