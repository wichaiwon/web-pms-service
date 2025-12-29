import { Inject, Injectable } from "@nestjs/common";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { PatchVehicleServiceReviewInProcessDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-in-process.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";

@Injectable()
export class PatchInProcessUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
    ) { }
    
    async execute(id: string, patchDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReviewDto> {
        if (patchDto.responsible) {
            const existing = await this.vehicleServiceReviewRepository.getVehicleServiceReviewById(id);
            if (existing) {
                const currentResponsible = existing.responsible || [];

                if (typeof patchDto.responsible === 'string') {
                    // ถ้าส่งมาเป็น string: เพิ่มเข้า array ถ้ายังไม่มี
                    if (!currentResponsible.includes(patchDto.responsible)) {
                        patchDto.responsible = [...currentResponsible, patchDto.responsible];
                    } else {
                        patchDto.responsible = currentResponsible;
                    }
                } else if (Array.isArray(patchDto.responsible)) {
                    // ถ้าส่งมาเป็น array: รวมกับของเดิมแล้ว filter duplicate
                    const merged = [...currentResponsible, ...patchDto.responsible];
                    patchDto.responsible = Array.from(new Set(merged));
                }
            } else {
                patchDto.responsible = Array.isArray(patchDto.responsible)
                    ? Array.from(new Set(patchDto.responsible))
                    : [patchDto.responsible];
            }
        }
        return await this.vehicleServiceReviewRepository.patchInProcess(id, patchDto);
    }
}
