import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { UpdateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/update-vehicle-service-review.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class UpdateVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }

    async execute(id: string, updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {

        // Business Logic: Handle responsible field - merge with existing, check duplicate
        if (updateDto.responsible) {
            const existing = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(id);
            if (existing) {
                const currentResponsible = existing.responsible || [];

                if (typeof updateDto.responsible === 'string') {
                    // ถ้าส่งมาเป็น string: เพิ่มเข้า array ถ้ายังไม่มี
                    if (!currentResponsible.includes(updateDto.responsible)) {
                        updateDto.responsible = [...currentResponsible, updateDto.responsible];
                    } else {
                        updateDto.responsible = currentResponsible;
                    }
                } else if (Array.isArray(updateDto.responsible)) {
                    // ถ้าส่งมาเป็น array: รวมกับของเดิมแล้ว filter duplicate
                    const merged = [...currentResponsible, ...updateDto.responsible];
                    updateDto.responsible = Array.from(new Set(merged));
                }
            } else {
                updateDto.responsible = Array.isArray(updateDto.responsible)
                    ? Array.from(new Set(updateDto.responsible))
                    : [updateDto.responsible];
            }
        }

        // เรียก Repository ทำ Data Access เท่านั้น
        return await this.vehicleServiceReviewRepository.updateVehicleServiceReview(id, updateDto);
    }
}