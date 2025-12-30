import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewStepOne } from "./domain/entities/vehicle-service-review-step-one.entity";
import { VehicleServiceReviewStepOneAdditional } from "./domain/entities/vehicle-service-review-step-one-additional.entity";
import { StepOneController } from "./interfaces/controllers/step-one.controller";
import { CreateStepOneUseCase } from "./application/commands/create-step-one.use-case";
import { CreateStepOnesUseCase } from "./application/commands/create-step-ones.use-case";
import { StepOneRepository } from "./infrastructure/step-one.repository";
import { StepOneService } from "./application/step-one.service";
import { GetStepOneByReviewIdUseCase } from "./application/queries/get-step-one-by-review-id.use-case";
import { UpdateStepOneUseCase } from "./application/commands/update-step-one.use-case";
import { CreateStepOneAdditionalUseCase } from "./application/commands/create-step-one-additional.use-case";
import { UpdateStepOneAdditionalUseCase } from "./application/commands/update-step-one-additional.use-case";
import { GetStepOneByIdUseCase } from "./application/queries/get-step-one-by-id.use-case";
import { GetStepOneAdditionalByIdUseCase } from "./application/queries/get-step-one-additional-by-id.use-case";
import { GetStepOneAdditionalByStepOneIdUseCase } from "./application/queries/get-step-one-additional-by-step-one-id.use-case";
import { PatchStepOneUseIsActiveCase } from "./application/commands/patch-step-one-is-active.use-case";
import { PatchStepOneSuccessFlagUseCase } from "./application/commands/patch-step-one-success-flag.use-case";
import { PatchStepOneAdditionalIsActiveUseCase } from "./application/commands/patch-step-one-additional-is-active.use-case";
import { PatchStepOneAdditionalSuccessFlagUseCase } from "./application/commands/patch-step-one-additional-success-flag.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([VehicleServiceReviewStepOne, VehicleServiceReviewStepOneAdditional])],
    controllers: [StepOneController],
    providers: [
        GetStepOneByIdUseCase,
        GetStepOneByReviewIdUseCase,
        CreateStepOneUseCase,
        CreateStepOnesUseCase,
        UpdateStepOneUseCase,
        PatchStepOneUseIsActiveCase,
        PatchStepOneSuccessFlagUseCase,
        GetStepOneAdditionalByIdUseCase,
        GetStepOneAdditionalByStepOneIdUseCase,
        CreateStepOneAdditionalUseCase,
        UpdateStepOneAdditionalUseCase,
        PatchStepOneAdditionalIsActiveUseCase,
        PatchStepOneAdditionalSuccessFlagUseCase,
        StepOneService,
        {
            provide: 'IStepOneRepository',
            useClass: StepOneRepository,
        }
    ],
    exports: [StepOneService, 'IStepOneRepository'],
})
export class VehicleServiceReviewStepOneModule { }
