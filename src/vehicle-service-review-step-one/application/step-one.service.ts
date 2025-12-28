import { Injectable } from "@nestjs/common";
import { CreateStepOneUseCase } from "./commands/create-step-one.use-case";
import type { IStepOneServiceInterface } from "../domain/interfaces/step-one.service.interface";
import { CreateStepOneDto } from "../interfaces/dtos/create-step-one.dto";
import { StepOneDto } from "../interfaces/dtos/step-one.dto";
import { GetStepOneByReviewIdUseCase } from "./queries/get-step-one-by-review-id.use-case";
import { UpdateStepOneUseCase } from "./commands/update-step-one.use-case";
import { UpdateStepOneDto } from "../interfaces/dtos/update-step-one.dto";
import { PatchStepOneDto } from "../interfaces/dtos/patch-step-one.dto";
import { PatchIsActiveStepOneUseCase } from "./commands/patch-is-active.use-case";
import { PatchSuccessFlagStepOneUseCase } from "./commands/patch-success-flag.use-case";

@Injectable()
export class StepOneService implements IStepOneServiceInterface {
    constructor(
        private readonly createStepOneUseCase: CreateStepOneUseCase,
        private readonly getStepOneByReviewIdUseCase: GetStepOneByReviewIdUseCase,
        private readonly updateStepOneUseCase: UpdateStepOneUseCase,
        private readonly patchIsActiveUseCase: PatchIsActiveStepOneUseCase,
        private readonly patchSuccessFlagUseCase: PatchSuccessFlagStepOneUseCase,
    ) { }
    async getStepOneByReviewId(vehicleServiceReviewId: string): Promise<StepOneDto | null> {
        return this.getStepOneByReviewIdUseCase.execute(vehicleServiceReviewId);
    }
    async createStepOne(createDto: CreateStepOneDto): Promise<StepOneDto> {
        return this.createStepOneUseCase.execute(createDto);
    }
    async updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<StepOneDto> {
        return this.updateStepOneUseCase.execute(id, updateDto);
    }
    async patchIsActiveStepOne(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        return this.patchIsActiveUseCase.execute(id, patchDto);
    }
    async patchSuccessFlagStepOne(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        return this.patchSuccessFlagUseCase.execute(id, patchDto);
    }
}
