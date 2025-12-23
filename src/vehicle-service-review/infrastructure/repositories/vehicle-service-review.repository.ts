import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Branch } from "src/shared/enum/employee/employee.enum";
import { VehicleServiceReview } from "src/vehicle-service-review/domain/entities/vehicle-service-review.entity";
import { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
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
    async updateVehicleServiceReview(id: string, updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReviewDto> {
        // Data Access Only: Update และ return ข้อมูล
        await this.vehicleServiceReviewRepository.update(id, updateDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with UUID ${id} not found`);
        }
        return updated;
    }

    async findById(id: string): Promise<VehicleServiceReviewDto> {
        const found = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return found;
    }

    async patchInProcessFlag(id: string, patchInprocessDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReviewDto> {
        // Data Access Only: Update และ return ข้อมูล
        await this.vehicleServiceReviewRepository.update(id, patchInprocessDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return updated;
    }

    async patchSuccessFlag(id: string, patchSuccessDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReviewDto> {
        await this.vehicleServiceReviewRepository.update(id, patchSuccessDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return updated;
    }

    async patchActiveStatus(id: string, patchActiveStatusDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReviewDto> {
        await this.vehicleServiceReviewRepository.update(id, patchActiveStatusDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return updated;
    }
}
