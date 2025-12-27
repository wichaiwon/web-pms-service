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
import { VehicleServiceReviewDetail } from "./domain/entities/detail.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleServiceReviewDetail]),
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
        {
            provide: 'IDetailRepository',
            useClass: DetailRepository,
        }
    ],
    exports: [DetailService],
})
export class VehicleServiceReviewDetailModule { }
