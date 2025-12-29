import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewStepTwo } from "./domain/entities/vehicle-service-review-step-two.entity";
import { StepTwoController } from "./interfaces/controllers/step-two.controller";
import { CreateStepTwoUseCase } from "./application/commands/create-step-two.use-case";
import { StepTwoService } from "./application/step-two.service";
import { StepTwoRepository } from "./infrastructure/step-two.repository";
import { UpdateStepTwoUseCase } from "./application/commands/update-step-two.use-case";
import { PatchStepTwoIsActiveUseCase } from "./application/commands/patch-step-two-is-active.use-case";
import { PatchStepTwoSuccessFlagUseCase } from "./application/commands/patch-step-two-success-flag.use-case";
import { GetStepTwoByReviewIdUseCase } from "./application/queries/get-step-two-by-review-id.use-case";
import { CreateStepTwoAdditionalUseCase } from "./application/commands/create-step-two-additional.use-case";
import { PatchStepTwoAdditionalIsActiveUseCase } from "./application/commands/patch-step-two-additional-is-active-.use-case";
import { UpdateStepTwoAdditionalUseCase } from "./application/commands/update-step-two-additional.use-case";
import { PatchStepTwoAdditionalSuccessFlagUseCase } from "./application/commands/patch-step-two-additional-success-flag.use-case";
import { VehicleServiceReviewStepTwoAdditional } from "./domain/entities/vehicle-service-review-step-two-additional.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VehicleServiceReviewStepTwo,
        VehicleServiceReviewStepTwoAdditional
    ])],
    controllers: [StepTwoController],
    providers: [
        GetStepTwoByReviewIdUseCase,
        CreateStepTwoUseCase,
        UpdateStepTwoUseCase,
        PatchStepTwoIsActiveUseCase,
        PatchStepTwoSuccessFlagUseCase,
        CreateStepTwoAdditionalUseCase,
        UpdateStepTwoAdditionalUseCase,
        PatchStepTwoAdditionalIsActiveUseCase,
        PatchStepTwoAdditionalSuccessFlagUseCase,
        StepTwoService,
        {
            provide: 'IStepTwoRepository',
            useClass: StepTwoRepository,
        }
    ],
    exports: [StepTwoService, 'IStepTwoRepository'],
})
export class VehicleServiceReviewStepTwoModule { }
