import { Injectable } from "@nestjs/common";
import { CreateStepTwoUseCase } from "./commands/create-step-two.use-case";
import { CreateStepTwoDto } from "../interfaces/dtos/create-step-two.dto";
import { StepTwoDto } from "../interfaces/dtos/step-two.dto";
import { IStepTwoServiceInterface } from "../domain/interfaces/step-two.service.interface";
import { GetStepTwoByReviewIdUseCase } from "./queries/get-step-two-by-review-id.use-case";
import { UpdateStepTwoUseCase } from "./commands/update-step-two.use-case";
import { PatchStepTwoSuccessFlagUseCase } from "./commands/patch-step-two-success-flag.use-case";
import { PatchStepTwoIsActiveUseCase } from "./commands/patch-step-two-is-active.use-case";
import { UpdateStepTwoDto } from "../interfaces/dtos/update-step-two.dto";
import { PatchStepTwoDto } from "../interfaces/dtos/patch-step-two.dto";

@Injectable()
export class StepTwoService implements IStepTwoServiceInterface {
    constructor(
        private readonly createStepTwoUseCase: CreateStepTwoUseCase,
        private readonly getStepTwoUseCase: GetStepTwoByReviewIdUseCase,
        private readonly updateStepTwoUseCase: UpdateStepTwoUseCase,
        private readonly patchStepTwoSuccessFlagUseCase: PatchStepTwoSuccessFlagUseCase,
        private readonly patchStepTwoIsActiveUseCase: PatchStepTwoIsActiveUseCase,
    ) { }
    async createStepTwo(createDto: CreateStepTwoDto): Promise<StepTwoDto> {
        return this.createStepTwoUseCase.execute(createDto);
    }
    async getStepTwoByReviewId(reviewId: string): Promise<StepTwoDto | null> {
        return this.getStepTwoUseCase.execute(reviewId);
    }
    async updateStepTwo(id: string, updateDto: UpdateStepTwoDto): Promise<StepTwoDto> {
        return this.updateStepTwoUseCase.execute(id, updateDto);
    }
    async patchStepTwoIsActive(id: string,patchDto: PatchStepTwoDto): Promise<StepTwoDto> {
        return this.patchStepTwoIsActiveUseCase.execute(id, patchDto);
    }
    async patchStepTwoSuccessFlag(id: string, patchDto: PatchStepTwoDto): Promise<StepTwoDto> {
        return this.patchStepTwoSuccessFlagUseCase.execute(id, patchDto);
    }
}
