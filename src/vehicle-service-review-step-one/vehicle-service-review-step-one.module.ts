import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewStepOne } from "./domain/entities/vehicle-service-review-step-one.entity";
import { VehicleServiceReviewStepOneAdditional } from "./domain/entities/vehicle-service-review-step-one-additional.entity";
import { StepOneController } from "./interfaces/controllers/step-one.controller";
import { CreateStepOneUseCase } from "./application/commands/create-step-one.use-case";
import { StepOneRepository } from "./infrastructure/step-one.repository";
import { StepOneService } from "./application/step-one.service";
import { GetStepOneByReviewIdUseCase } from "./application/queries/get-step-one-by-review-id.use-case";
import { UpdateStepOneUseCase } from "./application/commands/update-step-one.use-case";
import { PatchIsActiveStepOneUseCase } from "./application/commands/patch-step-one-is-active.use-case";
import { PatchSuccessFlagStepOneUseCase } from "./application/commands/patch-step-one-success-flag.use-case";
import { CreateStepOneAdditionalUseCase } from "./application/commands/create-step-one-additional.use-case";
import { UpdateStepOneAdditionalUseCase } from "./application/commands/update-step-one-additional.use-case";
import { PatchIsActiveStepOneAdditionalUseCase } from "./application/commands/patch-step-one-additional-is-active.use-case";
import { PatchSuccessFlagStepOneAdditionalUseCase } from "./application/commands/patch-step-one-additional-success-flag.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([VehicleServiceReviewStepOne, VehicleServiceReviewStepOneAdditional])],
    controllers: [StepOneController],
    providers: [
        GetStepOneByReviewIdUseCase,
        CreateStepOneUseCase,
        UpdateStepOneUseCase,
        PatchIsActiveStepOneUseCase,
        PatchSuccessFlagStepOneUseCase,
        CreateStepOneAdditionalUseCase,
        UpdateStepOneAdditionalUseCase,
        PatchIsActiveStepOneAdditionalUseCase,
        PatchSuccessFlagStepOneAdditionalUseCase,
        StepOneService,
        {
            provide: 'IStepOneRepository',
            useClass: StepOneRepository,
        }
    ],
    exports: [StepOneService, 'IStepOneRepository'],
})
export class VehicleServiceReviewStepOneModule { }
