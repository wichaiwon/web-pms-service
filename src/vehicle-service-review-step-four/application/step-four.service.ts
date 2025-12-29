import { Injectable } from "@nestjs/common";
import { IStepFourServiceInterface } from "../domain/interfaces/step-four.service.interface";
import { GetStepFourByReviewIdUseCase } from "./queries/get-step-four-by-review-id.use-case";
import { CreateStepFourUseCase } from "./command/create-step-four.use-case";
import { UpdateStepFourUseCase } from "./command/update-step-four.use-case";
import { PatchStepfourSuccessFlagUseCase } from "./command/patch-step-four-success-flag.use-case";
import { PatchStepfourIsActiveUseCase } from "./command/patch-step-four-is-active.use-case";
import { StepFourDto } from "../interfaces/dtos/step-four.dto";
import { CreateStepfourDto } from "../interfaces/dtos/create-step-four.dto";
import { UpdateStepfourDto } from "../interfaces/dtos/update-step-four.dto";
import { PatchStepfourDto } from "../interfaces/dtos/patch-step-four.dto";
@Injectable()
export class StepFourService implements IStepFourServiceInterface {
    constructor(
        private readonly getStepFourByReviewIdUseCase: GetStepFourByReviewIdUseCase,
        private readonly createStepFourUseCase: CreateStepFourUseCase,
        private readonly updateStepFourUseCase: UpdateStepFourUseCase,
        private readonly patchStepfourSuccessFlagUseCase: PatchStepfourSuccessFlagUseCase,
        private readonly patchStepfourIsActiveUseCase: PatchStepfourIsActiveUseCase,
    ) { }
    async getStepFourByReviewId(reviewId: string): Promise<StepFourDto | null> {
        return this.getStepFourByReviewIdUseCase.execute(reviewId);
    }
    async createStepFour(createDto:CreateStepfourDto): Promise<StepFourDto> {
        return this.createStepFourUseCase.execute(createDto);
    }
    async updateStepFour(id: string, updateDto: UpdateStepfourDto): Promise<StepFourDto> {
        return this.updateStepFourUseCase.execute(id, updateDto);
    }
    async patchStepFourSuccessFlag(id: string, patchDto: PatchStepfourDto): Promise<StepFourDto> {
        return this.patchStepfourSuccessFlagUseCase.execute(id, patchDto);
    }
    async patchStepFourIsActive(id: string, patchDto: PatchStepfourDto): Promise<StepFourDto> {
        return this.patchStepfourIsActiveUseCase.execute(id, patchDto);
    }
}
