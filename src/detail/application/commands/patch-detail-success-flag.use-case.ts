import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/detail/interfaces/dtos/detail.dto";
import { PatchDetailDto } from "src/detail/interfaces/dtos/patch-detail.dto";

@Injectable()
export class PatchSuccessFlagUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }

    async execute(id: string, patchDto: PatchDetailDto): Promise<DetailDto> {
        return await this.detailRepository.patchSuccessFlag(id, patchDto);
    }
}
