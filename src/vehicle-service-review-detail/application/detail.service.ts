import { Injectable } from "@nestjs/common";
import type { IDetailServiceInterface } from "../domain/interfaces/detail.service.interface";
import { CreateDetailUseCase } from "./commands/create-detail.use-case";
import { CreateDetailDto } from "../interfaces/dtos/create-detail.dto";
import { DetailDto } from "../interfaces/dtos/detail.dto";
import { CreateDetailsUseCase } from "./commands/create-details.use-case";
import { UpdateDetailUseCase } from "./commands/update-detail.use-case";
import { PatchSuccessFlagUseCase } from "./commands/patch-detail-success-flag.use-case";
import { PatchIsActiveUseCase } from "./commands/patch-detail-is-active.use-case";
import { UpdateDetailDto } from "../interfaces/dtos/update-detail.dto";
import { PatchDetailDto } from "../interfaces/dtos/patch-detail.dto";
import { CreateDetailAdditionalUseCase } from "./commands/create-detail-additional.use-case";
import { CreateDetailAdditionalDto } from "../interfaces/dtos/create-detail-additional.dto";
import { DetailAdditionalDto } from "../interfaces/dtos/detail-additional.dto";
import { UpdateDetailAdditionalUseCase } from "./commands/update-detail-additional.use-case";
import { UpdateDetailAdditionalDto } from "../interfaces/dtos/update-detail-additional.dto";
import { PatchDetailAdditionalIsActiveUseCase } from "./commands/patch-detail-additional-is-active.use-case";
import { PatchDetailAdditionalSuccessFlagUseCase } from "./commands/patch-detail-additional-success-flag.use-case";


@Injectable()
export class DetailService implements IDetailServiceInterface {
    constructor(
        private readonly createDetailUseCase: CreateDetailUseCase,
        private readonly createDetailsUseCase: CreateDetailsUseCase,
        private readonly updateDetailUseCase: UpdateDetailUseCase, 
        private readonly patchSuccessFlagUseCase: PatchSuccessFlagUseCase,
        private readonly patchIsActiveUseCase: PatchIsActiveUseCase,
        private readonly createDetailAdditionalUseCase: CreateDetailAdditionalUseCase,
        private readonly updateDetailAdditionalUseCase: UpdateDetailAdditionalUseCase,
        private readonly patchDetailAdditionalIsActiveUseCase: PatchDetailAdditionalIsActiveUseCase,
        private readonly patchDetailAdditionalSuccessFlagUseCase: PatchDetailAdditionalSuccessFlagUseCase,        
    ) { }

    async createDetail(createDto: CreateDetailDto): Promise<DetailDto> {
        return await this.createDetailUseCase.execute(createDto);
    }

    async createDetails(createDtos: CreateDetailDto[]): Promise<DetailDto[]> {
        return await this.createDetailsUseCase.execute(createDtos);
    }

    async updateDetail(id: string, updateDto: UpdateDetailDto): Promise<DetailDto> {
        return await this.updateDetailUseCase.execute(id, updateDto);
    }

    async patchSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<DetailDto> {
        return await this.patchSuccessFlagUseCase.execute(id, patchDto);
    }

    async patchIsActive(id: string, patchDto: PatchDetailDto): Promise<DetailDto> {
        return await this.patchIsActiveUseCase.execute(id, patchDto);
    }

    async createDetailAdditional( createDto: CreateDetailAdditionalDto): Promise<DetailAdditionalDto> {
        return await this.createDetailAdditionalUseCase.execute(createDto);
    }
    async updateDetailAdditional(id: string, updateDto: UpdateDetailAdditionalDto): Promise<DetailAdditionalDto> {
        return await this.updateDetailAdditionalUseCase.execute(id, updateDto);
    }
    async patchDetailAdditionalIsActive(id: string, patchDto: PatchDetailDto): Promise<DetailAdditionalDto> {
        return await this.patchDetailAdditionalIsActiveUseCase.execute(id, patchDto);
    }
    async patchDetailAdditionalSuccessFlag(id: string, patchDto: PatchDetailDto): Promise<DetailAdditionalDto> {
        return await this.patchDetailAdditionalSuccessFlagUseCase.execute(id, patchDto);
    }
}
