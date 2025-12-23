import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReview } from "./domain/entities/vehicle-service-review.entity";
import { VehicleServiceReviewController } from "./interfaces/controllers/vehicle-service-review.controller";
import { CreateVehicleServiceReviewUseCase } from "./application/commands/create-vehicle-service-review.use-case";
import { CreateVehicleServiceReviewsUseCase } from "./application/commands/create-vehicle-service-reviews.use-case";
import { GetVehicleServiceReviewUseCase } from "./application/queries/get-vehicle-service-review.use-case";
import { VehicleServiceReviewService } from "./application/vehicle-service-review.service";
import { VehicleServiceReviewRepository } from "./infrastructure/repositories/vehicle-service-review.repository";
import { UpdateVehicleServiceReviewUseCase } from "./application/commands/update-vehicle-service-review.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleServiceReview]),
    ],
    controllers: [VehicleServiceReviewController],
    providers: [
        VehicleServiceReviewService,
        CreateVehicleServiceReviewUseCase,
        CreateVehicleServiceReviewsUseCase,
        GetVehicleServiceReviewUseCase,
        UpdateVehicleServiceReviewUseCase,
        {
            provide: 'IVehicleServiceReviewRepository',
            useClass: VehicleServiceReviewRepository,
        }
        
    ],
    exports: [VehicleServiceReviewService],
})
export class VehicleServiceReviewModule { }