import { Module, Patch } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewStepThree } from "./domain/entities/vehicle-service-review-step-three.entity";
import { StepThreeController } from "./interfaces/controllers/step-three.controller";
import { CreateStepThreeUseCase } from "./application/commands/create-step-three.use-case";
import { StepThreeService } from "./application/step-three.service";
import { stepThreeRepository } from "./infrastructure/step-three.repository";
import { GetStepThreeByReviewIdUseCase } from "./application/queries/get-step-three-by-review-id.use-case";
import { UpdateStepThreeUseCase } from "./application/commands/update-step-three.use-case";
import { PatchStepthreeIsActiveUseCase } from "./application/commands/patch-step-three-is-active.use-case";
import { PatchStepthreeSuccessFlagUseCase } from "./application/commands/patch-step-three-success-flag.use-case";
import { CreateStepThreeAdditionalUseCase } from "./application/commands/create-step-three-additional.use-case";
import { UpdateStepThreeAdditionalUseCase } from "./application/commands/update-step-three-additional.use-case";
import { VehicleServiceReviewStepThreeAdditional } from "./domain/entities/vehicle-service-review-step-three-additional.entity";
import { PatchStepThreeAdditionalIsActiveUseCase } from "./application/commands/patch-step-three-additional-is-active.use-case";
import { PatchStepThreeAdditionalSuccessFlagUseCase } from "./application/commands/patch-step-three-additional-success-flag.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            VehicleServiceReviewStepThree,
            VehicleServiceReviewStepThreeAdditional    
        ])
    ],
    controllers: [StepThreeController],
    providers: [
        GetStepThreeByReviewIdUseCase,
        CreateStepThreeUseCase,
        UpdateStepThreeUseCase,
        PatchStepthreeIsActiveUseCase,
        PatchStepthreeSuccessFlagUseCase,
        CreateStepThreeAdditionalUseCase,
        UpdateStepThreeAdditionalUseCase,
        PatchStepThreeAdditionalIsActiveUseCase,
        PatchStepThreeAdditionalSuccessFlagUseCase,
        StepThreeService,
        {
            provide: 'IStepThreeRepository',
            useClass: stepThreeRepository,
        }
    ],
    exports: [StepThreeService, 'IStepThreeRepository'],
})
export class VehicleServiceReviewStepThreeModule { }
