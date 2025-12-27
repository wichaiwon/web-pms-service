import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/detail.entity";
import { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";
import { UpdateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail.dto";

import { Repository } from "typeorm";

@Injectable()
export class DetailRepository implements IDetailRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewDetail)
        private readonly detailRepository: Repository<VehicleServiceReviewDetail>,
    ) { }

    async getDetailById(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetail|null> {
        const detail = await this.detailRepository.findOne({
            where: { vehicle_service_review_id: vehicleServiceReviewId, is_active: true },
        });
        return detail;
    }

    async createDetail(
        createDto: CreateDetailDto
    ): Promise<VehicleServiceReviewDetail> {
        const newDetail = this.detailRepository.create(createDto);
        return await this.detailRepository.save(newDetail);
    }

    async createDetails(
        createDto: CreateDetailDto[]
    ): Promise<VehicleServiceReviewDetail[]> {
        const newDetails = this.detailRepository.create(createDto);
        return await this.detailRepository.save(newDetails);
    }

    async updateDetail(
        id: string,
        updateDto: UpdateDetailDto
    ): Promise<VehicleServiceReviewDetail> {
        const existingDetail = await this.detailRepository.findOne({ where: { id } });
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const updatedDetail = Object.assign(existingDetail, updateDto);
        return await this.detailRepository.save(updatedDetail);
    }

    async patchSuccessFlag(
        id: string,
        patchDto: PatchDetailDto
    ): Promise<VehicleServiceReviewDetail> {
        const existingDetail = await this.detailRepository.findOne({ where: { id } });
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const patchedDetail = Object.assign(existingDetail, patchDto);
        return await this.detailRepository.save(patchedDetail);
    }

    async patchIsActive(
        id: string,
        patchDto: PatchDetailDto
    ): Promise<VehicleServiceReviewDetail> {
        const existingDetail = await this.detailRepository.findOne({ where: { id } });
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const patchedDetail = Object.assign(existingDetail, patchDto);
        return await this.detailRepository.save(patchedDetail);
    }
}
