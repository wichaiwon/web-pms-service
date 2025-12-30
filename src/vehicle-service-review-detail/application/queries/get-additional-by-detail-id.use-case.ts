import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";

@Injectable()
export class GetDetailAdditionalByDetailIdUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) { }
    async execute(detailId: string): Promise<DetailAdditionalDto | null> {
        const existingDetail =  await this.detailRepository.getAdditionalByDetailId(detailId);
        if (!existingDetail) {
            throw new Error(`Detail Additional with Detail ID ${detailId} not found.`);
        }
        return existingDetail;
    }
}
