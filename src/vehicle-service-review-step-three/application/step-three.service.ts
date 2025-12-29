import { Injectable } from "@nestjs/common";
import { IStepThreeServiceInterface } from "../domain/interfaces/step-three.service.interface";
import { CreateStepThreeUseCase } from "./commands/create-step-three.use-case";
import { StepThreeDto } from "../interfaces/dtos/step-three.dto";
import { CreateStepThreeDto } from "../interfaces/dtos/create-step-three.dto";
import { GetStepThreeByReviewIdUseCase } from "./queries/get-step-three-by-review-id.use-case";
import { UpdateStepThreeUseCase } from "./commands/update-step-three.use-case";
import { UpdateStepThreeDto } from "../interfaces/dtos/update-step-three.dto";
import { PatchStepThreeDto } from "../interfaces/dtos/patch-step-three.dto";
import { PatchStepthreeIsActiveUseCase } from "./commands/patch-step-three-is-active.use-case";
import { PatchStepthreeSuccessFlagUseCase } from "./commands/patch-step-three-success-flag.use-case";
import { CreateStepThreeAdditionalUseCase } from "./commands/create-step-three-additional.use-case";
import { UpdateStepThreeAdditionalUseCase } from "./commands/update-step-three-additional.use-case";
import { StepThreeAdditionalDto } from "../interfaces/dtos/step-three-additional.dto";
import { CreateStepThreeAdditionalDto } from "../interfaces/dtos/create-step-three-additional.dto";
import { UpdateStepThreeAdditionalDto } from "../interfaces/dtos/update-step-three-additional.dto";
import { PatchStepThreeAdditionalIsActiveUseCase } from "./commands/patch-step-three-additional-is-active.use-case";
import { PatchStepThreeAdditionalSuccessFlagUseCase } from "./commands/patch-step-three-additional-success-flag.use-case";

@Injectable()
export class StepThreeService implements IStepThreeServiceInterface {
    constructor(
        private readonly getStepThreeByReviewIdUseCase: GetStepThreeByReviewIdUseCase,
        private readonly createStepThreeUseCase: CreateStepThreeUseCase,
        private readonly updateStepThreeUseCase: UpdateStepThreeUseCase,
        private readonly patchStepThreeIsActiveUseCase: PatchStepthreeIsActiveUseCase,
        private readonly patchStepThreeSuccessFlagUseCase: PatchStepthreeSuccessFlagUseCase,
        private readonly createStepThreeAdditionalUseCase: CreateStepThreeAdditionalUseCase,
        private readonly updateStepThreeAdditionalUseCase: UpdateStepThreeAdditionalUseCase,
        private readonly patchStepThreeAdditionalIsActiveUseCase: PatchStepThreeAdditionalIsActiveUseCase,
        private readonly patchStepThreeAdditionalSuccessFlagUseCase: PatchStepThreeAdditionalSuccessFlagUseCase,
    ) { }
    async createStepThree(createDto: CreateStepThreeDto): Promise<StepThreeDto> {
        return this.createStepThreeUseCase.execute(createDto);
    }
    async getStepThreeByReviewId(reviewId: string): Promise<StepThreeDto | null> {
        return this.getStepThreeByReviewIdUseCase.execute(reviewId);
    }
    async updateStepThree(id: string, updateDto: UpdateStepThreeDto): Promise<StepThreeDto> {
        return this.updateStepThreeUseCase.execute(id, updateDto);
    } 
    async patchStepThreeIsActive(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        return this.patchStepThreeIsActiveUseCase.execute(id, patchDto);
    }
    async patchStepThreeSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        return this.patchStepThreeSuccessFlagUseCase.execute(id, patchDto);
    }
    async createStepThreeAdditional(createDto: CreateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto> {
    return this.createStepThreeAdditionalUseCase.execute(createDto);
    }
    async updateStepThreeAdditional(id: string, updateDto: UpdateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto> {
        return this.updateStepThreeAdditionalUseCase.execute(id, updateDto);
    }
    async patchStepThreeAdditionalIsActive(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto> {
        return this.patchStepThreeAdditionalIsActiveUseCase.execute(id, patchDto);
    }
    async patchStepThreeAdditionalSuccessFlag(id: string, patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto> {
        return this.patchStepThreeAdditionalSuccessFlagUseCase.execute(id, patchDto);
    }
}