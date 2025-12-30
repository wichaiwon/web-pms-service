import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewDetail } from "./domain/entities/vehicle-service-review-detail.entity";
import { VehicleServiceReviewDetailAdditional } from "./domain/entities/vehicle-service-review-detail-additional.entity";
import { DetailController } from "./interfaces/controllers/detail.controller";
import { GetDetailByReviewIdUseCase } from "./application/queries/get-detail-by-review-id.use-case";
import { GetDetailByIdUseCase } from "./application/queries/get-detail-by-id.use-case";
import { CreateDetailUseCase } from "./application/commands/create-detail.use-case";
import { CreateDetailsUseCase } from "./application/commands/create-details.use-case";
import { UpdateDetailUseCase } from "./application/commands/update-detail.use-case";
import { PatchSuccessFlagUseCase } from "./application/commands/patch-detail-success-flag.use-case";
import { PatchIsActiveUseCase } from "./application/commands/patch-detail-is-active.use-case";
import { GetDetailAdditionalByIdUseCase } from "./application/queries/get-additional-by-id.use-case";
import { GetDetailAdditionalByDetailIdUseCase } from "./application/queries/get-additional-by-detail-id.use-case";
import { CreateDetailAdditionalUseCase } from "./application/commands/create-detail-additional.use-case";
import { UpdateDetailAdditionalUseCase } from "./application/commands/update-detail-additional.use-case";
import { PatchDetailAdditionalSuccessFlagUseCase } from "./application/commands/patch-detail-additional-success-flag.use-case";
import { PatchDetailAdditionalIsActiveUseCase } from "./application/commands/patch-detail-additional-is-active.use-case";
import { DetailService } from "./application/detail.service";
import { DetailRepository } from "./infrastructure/repositories/detail.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleServiceReviewDetail, VehicleServiceReviewDetailAdditional]),
    ],
    controllers: [DetailController],
    providers: [
        GetDetailByIdUseCase,
        GetDetailByReviewIdUseCase,
        CreateDetailUseCase,
        CreateDetailsUseCase,
        UpdateDetailUseCase,
        PatchSuccessFlagUseCase,
        PatchIsActiveUseCase,
        GetDetailAdditionalByIdUseCase,
        GetDetailAdditionalByDetailIdUseCase,
        CreateDetailAdditionalUseCase,
        UpdateDetailAdditionalUseCase,
        PatchDetailAdditionalSuccessFlagUseCase,
        PatchDetailAdditionalIsActiveUseCase,
        DetailService,
        {
            provide: 'IDetailRepository',
            useClass: DetailRepository,
        }
    ],
    exports: [DetailService, 'IDetailRepository'],
})
export class VehicleServiceReviewDetailModule { }
