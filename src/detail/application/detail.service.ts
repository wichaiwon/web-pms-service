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


@Injectable()
export class DetailService implements IDetailServiceInterface {
    constructor(
        private readonly createDetailUseCase: CreateDetailUseCase,
        private readonly createDetailsUseCase: CreateDetailsUseCase,
        private readonly updateDetailUseCase: UpdateDetailUseCase, 
        private readonly patchSuccessFlagUseCase: PatchSuccessFlagUseCase,
        private readonly patchIsActiveUseCase: PatchIsActiveUseCase,
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
}
