import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Branch } from "src/shared/enum/employee/employee.enum";
import { VehicleServiceReview } from "src/vehicle-service-review/domain/entities/vehicle-service-review.entity";
import { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { PatchVehicleServiceReviewActiveStatusDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-active-status.dto";
import { PatchVehicleServiceReviewInProcessDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-in-process.dto";
import { PatchVehicleServiceReviewSuccessFlagDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-success-flag.dto";
import { UpdateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/update-vehicle-service-review.dto";
import { VehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/vehicle-service-review.dto";
import { Repository } from "typeorm";

@Injectable()
export class VehicleServiceReviewRepository implements IVehicleServiceReviewRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReview)
        private readonly vehicleServiceReviewRepository: Repository<VehicleServiceReview>,
    ) { }

    async createVehicleServiceReview(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        const newReview = this.vehicleServiceReviewRepository.create(createDto);
        return await this.vehicleServiceReviewRepository.save(newReview);
    }

    async createVehicleServiceReviews(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReviewDto[]> {
        const newReviews = this.vehicleServiceReviewRepository.create(createDtos);
        return await this.vehicleServiceReviewRepository.save(newReviews);
    }
    async getVehicleServiceReview(branch: Branch, is_active: boolean, date_booked: string): Promise<VehicleServiceReviewDto[]> {
        return await this.vehicleServiceReviewRepository.find({
            where: {
                branch_booked: branch,
                is_active,
                date_booked,
            },
        });
    }

    async updateVehicleServiceReview(updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        await this.vehicleServiceReviewRepository.update(updateDto.id, updateDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id: updateDto.id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with UUID ${updateDto.id} not found`);
        }
        return updated;
    }

    async patchInProcessFlag(patchInprocessDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReviewDto> {
        await this.vehicleServiceReviewRepository.update(patchInprocessDto.id, { in_process_flag: patchInprocessDto.in_process_flag });
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id: patchInprocessDto.id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${patchInprocessDto.id} not found`);
        }
        return updated;
    }

    async patchSuccessFlag(patchSuccessDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReviewDto> {
        await this.vehicleServiceReviewRepository.update(patchSuccessDto.id, { success_flag: patchSuccessDto.success_flag });
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id: patchSuccessDto.id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${patchSuccessDto.id} not found`);
        }
        return updated;
    }

    async patchActiveStatus(patchActiveStatusDto: PatchVehicleServiceReviewActiveStatusDto): Promise<VehicleServiceReviewDto> {
        await this.vehicleServiceReviewRepository.update(patchActiveStatusDto.id, { is_active: patchActiveStatusDto.is_active });
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id: patchActiveStatusDto.id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${patchActiveStatusDto.id} not found`);
        }
        return updated;
    }
}
