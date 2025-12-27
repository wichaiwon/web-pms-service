import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailController } from "./interfaces/controllers/detail.controller";
import { DetailService } from "./application/detail.service";
import { DetailRepository } from "./infrastructure/repositories/detail.repository";
import { GetDetailByIdUseCase } from "./application/queries/get-detail-id.use-case";
import { CreateDetailUseCase } from "./application/commands/create-detail.use-case";
import { CreateDetailsUseCase } from "./application/commands/create-details.use-case";
import { UpdateDetailUseCase } from "./application/commands/update-detail.use-case";
import { PatchIsActiveUseCase } from "./application/commands/patch-detail-is-active.use-case";
import { PatchSuccessFlagUseCase } from "./application/commands/patch-detail-success-flag.use-case";
import { VehicleServiceReviewDetail } from "./domain/entities/vehicle-service-review-detail.entity";
import { VehicleServiceReviewDetailAdditional } from "./domain/entities/vehicle-service-review-detail-additional.entity";
import { CreateDetailAdditionalUseCase } from "./application/commands/create-detail-additional.use-case";
import { UpdateDetailAdditionalUseCase } from "./application/commands/update-detail-additional.use-case";
import { PatchDetailAdditionalSuccessFlagUseCase } from "./application/commands/patch-detail-additional-success-flag.use-case";
import { PatchDetailAdditionalIsActiveUseCase } from "./application/commands/patch-detail-additional-is-active.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleServiceReviewDetail, VehicleServiceReviewDetailAdditional]),
    ],
    controllers: [DetailController],
    providers: [
        GetDetailByIdUseCase,
        CreateDetailUseCase,
        CreateDetailsUseCase,
        UpdateDetailUseCase,
        PatchSuccessFlagUseCase,
        PatchIsActiveUseCase,
        DetailService,
        CreateDetailAdditionalUseCase,
        UpdateDetailAdditionalUseCase,
        PatchDetailAdditionalSuccessFlagUseCase,
        PatchDetailAdditionalIsActiveUseCase,
        {
            provide: 'IDetailRepository',
            useClass: DetailRepository,
        }
    ],
    exports: [DetailService, 'IDetailRepository'],
})
export class VehicleServiceReviewDetailModule { }
