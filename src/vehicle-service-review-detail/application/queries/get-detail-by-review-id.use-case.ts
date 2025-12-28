import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";


@Injectable()
export class GetDetailByIdUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface
    ) { }

    async execute(vehicleServiceReviewId: string): Promise<DetailDto | null> {
        return this.detailRepository.getDetailByReviewId(vehicleServiceReviewId);
    }
}
