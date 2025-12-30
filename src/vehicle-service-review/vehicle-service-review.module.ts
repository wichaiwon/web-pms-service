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
import { PatchInProcessUseCase } from "./application/commands/patch-in-process.use-case";
import { PatchIsActiveUseCase } from "./application/commands/patch-is-active.use-case";
import { PatchSuccessFlagUseCase } from "./application/commands/patch-success-flag.use-case";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { AutoSyncVehicleServiceReviewUseCase } from "./application/commands/auto-sync-vehicle-service-review.use-case";
import { AppointmentSyncScheduler } from "./infrastructure/scheduler/auto-sync-vehicle-service-review.scheduler";
import { EmployeeModule } from "src/employee/employee.module";
import { VehicleServiceReviewDetailModule } from "src/vehicle-service-review-detail/vehicle-service-review-detail.module";
import { CancelVehicleServiceReviewUseCase } from "./application/commands/cancel-vehicle-service-review.use-case";
import { ReIssueVehicleServiceReviewUseCase } from "./application/commands/reissue-vehicle-service-review.use-case";
import { VehicleServiceReviewStepOneModule } from "src/vehicle-service-review-step-one/vehicle-service-review-step-one.module";
import { VehicleServiceReviewStepTwoModule } from "src/vehicle-service-review-step-two/vehicle-service-review-step-two.module";
import { VehicleServiceReviewStepThreeModule } from "src/vehicle-service-review-step-three/vehicle-step-three.module";

@Module({
    imports: [
        HttpModule,
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([VehicleServiceReview]),
        EmployeeModule,
        VehicleServiceReviewDetailModule,
        VehicleServiceReviewStepOneModule,
        VehicleServiceReviewStepTwoModule,
        VehicleServiceReviewStepThreeModule,
    ],
    controllers: [VehicleServiceReviewController],
    providers: [
        AutoSyncVehicleServiceReviewUseCase,
        AppointmentSyncScheduler,
        VehicleServiceReviewService,
        CreateVehicleServiceReviewUseCase,
        CreateVehicleServiceReviewsUseCase,
        GetVehicleServiceReviewUseCase,
        UpdateVehicleServiceReviewUseCase,
        PatchInProcessUseCase,
        PatchIsActiveUseCase,
        PatchSuccessFlagUseCase,
        CancelVehicleServiceReviewUseCase,
        ReIssueVehicleServiceReviewUseCase,
        {
            provide: 'IVehicleServiceReviewRepository',
            useClass: VehicleServiceReviewRepository,
        }
    ],
    exports: [VehicleServiceReviewService],
})
export class VehicleServiceReviewModule { }