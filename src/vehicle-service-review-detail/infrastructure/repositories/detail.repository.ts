import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleServiceReviewDetailAdditional } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail-additional.entity";
import { VehicleServiceReviewDetail } from "src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity";
import { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { CreateDetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail-additional.dto";
import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";
import { PatchDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/patch-detail.dto";
import { UpdateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/update-detail.dto";
import { Repository } from "typeorm";

@Injectable()
export class DetailRepository implements IDetailRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewDetail)
        private readonly detailRepository: Repository<VehicleServiceReviewDetail>,
        @InjectRepository(VehicleServiceReviewDetailAdditional)
        private readonly detailAdditionalRepository: Repository<VehicleServiceReviewDetailAdditional>,
    ) { }

    async getDetailById(id: string): Promise<VehicleServiceReviewDetail | null> {
        const detail = await this.detailRepository.findOne({
            where: { id },
        });
        return detail;
    }

    async getDetailByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetail | null> {
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
        const existingDetail = await this.detailRepository.findOne({ where: { id, is_active: true } });
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
        const result = await this.detailRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const updatedDetail = await this.detailRepository.findOne({ where: { id } });
        if (!updatedDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found after update.`);
        }
        return updatedDetail;
    }

    async patchIsActive(
        id: string,
        patchDto: PatchDetailDto
    ): Promise<VehicleServiceReviewDetail> {
        const result = await this.detailRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const updatedDetail = await this.detailRepository.findOne({ where: { id } });
        if (!updatedDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found after update.`);
        }
        return updatedDetail;
    }

    async getAdditionalById(id: string): Promise<DetailAdditionalDto | null> {
        const detailAdditional = await this.detailAdditionalRepository.findOne({
            where: { id },
        });
        return detailAdditional;
    }

    async getAdditionalByDetailId(detailId: string): Promise<DetailAdditionalDto | null> {
        const detailAdditional = await this.detailAdditionalRepository.findOne({
            where: { vehicle_service_review_detail_id: detailId, is_active: true },
        });
        return detailAdditional;
    }

    async createDetailAdditional(createDto: CreateDetailAdditionalDto): Promise<DetailAdditionalDto> {
        const newDetailAdditional = this.detailAdditionalRepository.create(createDto);
        return await this.detailAdditionalRepository.save(newDetailAdditional);
    }

    async updateDetailAdditional(id: string, updateDto: UpdateDetailDto): Promise<DetailAdditionalDto> {
        const existingDetailAdditional = await this.detailAdditionalRepository.findOne({ where: { id } });
        if (!existingDetailAdditional) {
            throw new NotFoundException(`Detail Additional with ID ${id} not found.`);
        }
        const updatedDetailAdditional = Object.assign(existingDetailAdditional, updateDto);
        return await this.detailAdditionalRepository.save(updatedDetailAdditional);
    }
    async patchAdditionalIsActive(id: string, patchDto: PatchDetailDto): Promise<DetailAdditionalDto> {
        const result = await this.detailAdditionalRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Detail Additional with ID ${id} not found.`);
        }
        const updatedDetailAdditional = await this.detailAdditionalRepository.findOne({ where: { id } });
        if (!updatedDetailAdditional) {
            throw new NotFoundException(`Detail Additional with ID ${id} not found after update.`);
        }
        return updatedDetailAdditional;
    }
    async patchAdditionalSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<DetailAdditionalDto> {
        const result = await this.detailAdditionalRepository.update(id, patchDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Detail Additional with ID ${id} not found.`);
        }
        const updatedDetailAdditional = await this.detailAdditionalRepository.findOne({ where: { id } });
        if (!updatedDetailAdditional) {
            throw new NotFoundException(`Detail Additional with ID ${id} not found after update.`);
        }
        return updatedDetailAdditional;
    }
}
