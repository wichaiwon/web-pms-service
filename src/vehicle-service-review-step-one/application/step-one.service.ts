import { Injectable } from "@nestjs/common";
import { CreateStepOneUseCase } from "./commands/create-step-one.use-case";
import type { IStepOneServiceInterface } from "../domain/interfaces/step-one.service.interface";
import { CreateStepOneDto } from "../interfaces/dtos/create-step-one.dto";
import { StepOneDto } from "../interfaces/dtos/step-one.dto";
import { GetStepOneByReviewIdUseCase } from "./queries/get-step-one-by-review-id.use-case";

@Injectable()
export class StepOneService implements IStepOneServiceInterface {
    constructor(
        private readonly createStepOneUseCase: CreateStepOneUseCase,
        private readonly getStepOneByReviewIdUseCase: GetStepOneByReviewIdUseCase,
    ) { }
    async getStepOneByReviewId(vehicleServiceReviewId: string): Promise<StepOneDto | null> {
        return this.getStepOneByReviewIdUseCase.execute(vehicleServiceReviewId);
    }
    async createStepOne(createDto: CreateStepOneDto): Promise<StepOneDto> {
        return this.createStepOneUseCase.execute(createDto);
    }
}
