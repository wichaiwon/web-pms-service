import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleServiceReviewStepOne } from "./domain/entities/vehicle-service-review-step-one.entity";
import { StepOneController } from "./interfaces/controllers/step-one.controller";
import { CreateStepOneUseCase } from "./application/commands/create-step-one.use-case";
import { StepOneRepository } from "./infrastructure/step-one.repository";
import { StepOneService } from "./application/step-one.service";
import { GetStepOneByReviewIdUseCase } from "./application/queries/get-step-one-by-review-id.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([VehicleServiceReviewStepOne])],
    controllers: [StepOneController],
    providers: [
        GetStepOneByReviewIdUseCase,
        CreateStepOneUseCase,
        StepOneService,
        {
            provide: 'IStepOneRepository',
            useClass: StepOneRepository,
        }
    ],
    exports: [StepOneService, 'IStepOneRepository'],
})
export class VehicleServiceReviewStepOneModule { }
