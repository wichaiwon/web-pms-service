import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailAdditionalDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail-additional.dto";

@Injectable()
export class GetDetailAdditionalByIdUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
    ) {}

    async execute(id: string): Promise<DetailAdditionalDto | null> {
        const detailAdditional =  await this.detailRepository.getAdditionalById(id);
        if (!detailAdditional) {
            throw new Error(`Detail Additional with ID ${id} not found.`);
        }
        return detailAdditional;
    }
}
