import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";

@Injectable()
export class GetDetailByIdUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface
    ) { }

    async execute(id: string): Promise<DetailDto | null> {
        const detail = await this.detailRepository.getDetailById(id);
        if (!detail) {
            throw new NotFoundException(`Detail with ID ${id} not found.`);
        }
        return detail;
    }
}