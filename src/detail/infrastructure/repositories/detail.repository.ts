import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Detail } from "src/detail/domain/entities/detail.entity";
import { IDetailRepositoryInterface } from "src/detail/domain/interfaces/detail.repository.interface";
import { CreateDetailDto } from "src/detail/interfaces/dtos/create-detail.dto";
import { UpdateDetailDto } from "src/detail/interfaces/dtos/update-detail.dto";
import { Repository } from "typeorm";

@Injectable()
export class DetailRepository implements IDetailRepositoryInterface {
    constructor(
        @InjectRepository(Detail)
        private readonly detailRepository: Repository<Detail>,
    ) { }

    async getDetailById(vehicleServiceReviewId: string): Promise<Detail|null> {
        const detail = await this.detailRepository.findOne({
            where: { vehicle_service_review_id: vehicleServiceReviewId, is_active: true },
        });
        return detail;
    }

    async createDetail(
        createDto: CreateDetailDto
    ): Promise<Detail> {
        const newDetail = this.detailRepository.create(createDto);
        return await this.detailRepository.save(newDetail);
    }

    async createDetails(
        createDto: CreateDetailDto[]
    ): Promise<Detail[]> {
        const newDetails = this.detailRepository.create(createDto);
        return await this.detailRepository.save(newDetails);
    }

    async updateDetail(
        id: string,
        updateDto: UpdateDetailDto
    ): Promise<Detail> {
        const existingDetail = await this.detailRepository.findOne({ where: { id } });
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const updatedDetail = Object.assign(existingDetail, updateDto);
        return await this.detailRepository.save(updatedDetail);
    }

    async patchSuccessFlag(
        id: string,
        patchDto: Partial<UpdateDetailDto>
    ): Promise<Detail> {
        const existingDetail = await this.detailRepository.findOne({ where: { id } });
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const patchedDetail = Object.assign(existingDetail, patchDto);
        return await this.detailRepository.save(patchedDetail);
    }

    async patchIsActive(
        id: string,
        patchDto: Partial<UpdateDetailDto>
    ): Promise<Detail> {
        const existingDetail = await this.detailRepository.findOne({ where: { id } });
        if (!existingDetail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        const patchedDetail = Object.assign(existingDetail, patchDto);
        return await this.detailRepository.save(patchedDetail);
    }
}
