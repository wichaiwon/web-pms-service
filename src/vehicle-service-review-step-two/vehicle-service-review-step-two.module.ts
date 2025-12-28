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

@Module({
    imports: [TypeOrmModule.forFeature([VehicleServiceReviewStepTwo,
        //VehicileServiceReviewStepTwoAdditional
    ])],
    controllers: [StepTwoController],
    providers: [
        GetStepTwoByReviewIdUseCase,
        CreateStepTwoUseCase,
        UpdateStepTwoUseCase,
        PatchStepTwoIsActiveUseCase,
        PatchStepTwoSuccessFlagUseCase,
        StepTwoService,
        {
            provide: 'IStepTwoRepository',
            useClass: StepTwoRepository,
        }
    ],
    exports: [StepTwoService, 'IStepTwoRepository'],
})
export class VehicleServiceReviewStepTwoModule { }
