import { Inject, Injectable } from "@nestjs/common";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import { DetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/detail.dto";

@Injectable()
export class GetDetailByReviewIdUseCase {
    constructor(
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface
    ) { }

    async execute(ReviewId: string): Promise<DetailDto | null> {
        const detail = await this.detailRepository.getDetailByReviewId(ReviewId);
        if (!detail) {
            throw new Error(`Detail with Review ID ${ReviewId} not found.`);
        }
        return detail;
    }
}
