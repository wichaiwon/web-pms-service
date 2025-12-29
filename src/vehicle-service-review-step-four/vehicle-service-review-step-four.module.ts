import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewStepFour } from "./domain/entities/vehicle-service-review-step-four.entity";
import { StepFourController } from "./interfaces/controllers/step-four.controller";
import { StepFourService } from "./application/step-four.service";
import { GetStepFourByReviewIdUseCase } from "./application/queries/get-step-four-by-review-id.use-case";
import { CreateStepFourUseCase } from "./application/command/create-step-four.use-case";
import { UpdateStepFourUseCase } from "./application/command/update-step-four.use-case";
import { PatchStepfourIsActiveUseCase } from "./application/command/patch-step-four-is-active.use-case";
import { StepFourRepository } from "./infrastructure/step-four.repository";
import { PatchStepfourSuccessFlagUseCase } from "./application/command/patch-step-four-success-flag.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([VehicleServiceReviewStepFour])],
    controllers: [StepFourController],
    providers: [
        GetStepFourByReviewIdUseCase,
        CreateStepFourUseCase,
        UpdateStepFourUseCase,
        PatchStepfourIsActiveUseCase,
        PatchStepfourSuccessFlagUseCase,
        StepFourService,
        {
            provide: 'IStepFourRepository',
            useClass : StepFourRepository
        }
    ],
    exports: [StepFourService,'IStepFourRepository'],
})
export class VehicleServiceReviewStepFourModule { }
