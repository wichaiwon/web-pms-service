import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewDetail } from "./domain/entities/vehicle-service-review-detail.entity";
import { CreateVehicleServiceReviewDetailUseCase } from "./application/commands/create-vehicle-service-review-detail.use-case";
import { VehicleServiceReviewDetailController } from "./interfaces/controllers/vehicle-service-review-detail.controller";
import { VehicleServiceReviewDetailService } from "./application/vehicle-service-review-detail.service";
import { VehicleServiceReviewDetailRepository } from "./infrastructure/repositories/vehicle-service-review-detail.repository";
import { GetVehicleServiceReviewDetailByIdUseCase } from "./application/queies/get-by-vehicle-service-review-id.use-case";
import { CreateVehicleServiceReviewDetailsUseCase } from "./application/commands/create-vehicle-service-review-details.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleServiceReviewDetail]),
    ],
    controllers: [VehicleServiceReviewDetailController],
    providers: [
        CreateVehicleServiceReviewDetailUseCase,
        CreateVehicleServiceReviewDetailsUseCase,
        GetVehicleServiceReviewDetailByIdUseCase,
        VehicleServiceReviewDetailService,
        {
            provide: 'IVehicleServiceReviewDetailRepository',
            useClass: VehicleServiceReviewDetailRepository,
        }
    ],
    exports: [VehicleServiceReviewDetailService],
})
export class VehicleServiceReviewDetailModule { }
