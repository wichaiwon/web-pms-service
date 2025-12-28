import { Injectable } from "@nestjs/common";
import { CreateStepOneUseCase } from "./commands/create-step-one.use-case";
import { IStepOneServiceInterface } from "../domain/interfaces/step-one.service.interface";
import { CreateStepOneDto } from "../interfaces/dtos/create-step-one.dto";
import { StepOneDto } from "../interfaces/dtos/step-one.dto";
import { GetStepOneByReviewIdUseCase } from "./queries/get-step-one-by-review-id.use-case";
import { UpdateStepOneUseCase } from "./commands/update-step-one.use-case";
import { UpdateStepOneDto } from "../interfaces/dtos/update-step-one.dto";
import { PatchStepOneDto } from "../interfaces/dtos/patch-step-one.dto";
import { PatchIsActiveStepOneUseCase } from "./commands/patch-step-one-is-active.use-case";
import { PatchSuccessFlagStepOneUseCase } from "./commands/patch-step-one-success-flag.use-case";
import { CreateStepOneAdditionalUseCase } from "./commands/create-step-one-additional.use-case";
import { CreateStepOneAdditionalDto } from "../interfaces/dtos/create-step-one-additional.dto";
import { StepOneAdditionalDto } from "../interfaces/dtos/step-one-additional.dto";
import { UpdateStepOneAdditionalDto } from "../interfaces/dtos/update-step-one-additional.dto";
import { UpdateStepOneAdditionalUseCase } from "./commands/update-step-one-additional.use-case";
import { PatchIsActiveStepOneAdditionalUseCase } from "./commands/patch-step-one-additional-is-active.use-case";
import { PatchSuccessFlagStepOneAdditionalUseCase } from "./commands/patch-step-one-additional-success-flag.use-case";

@Injectable()
export class StepOneService implements IStepOneServiceInterface {
    constructor(
        private readonly createStepOneUseCase: CreateStepOneUseCase,
        private readonly getStepOneByReviewIdUseCase: GetStepOneByReviewIdUseCase,
        private readonly updateStepOneUseCase: UpdateStepOneUseCase,
        private readonly patchIsActiveUseCase: PatchIsActiveStepOneUseCase,
        private readonly patchSuccessFlagUseCase: PatchSuccessFlagStepOneUseCase,
        private readonly createStepOneAdditionalUseCase: CreateStepOneAdditionalUseCase,
        private readonly updateStepOneAdditionalUseCase: UpdateStepOneAdditionalUseCase,
        private readonly patchIsActiveStepOneAdditionalUseCase: PatchIsActiveStepOneAdditionalUseCase,
        private readonly patchSuccessFlagStepOneAdditionalUseCase: PatchSuccessFlagStepOneAdditionalUseCase,
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
    async createStepOneAdditional(createDto: CreateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        return this.createStepOneAdditionalUseCase.execute(createDto);
    }
    async updateStepOneAdditional(id: string, updateDto: UpdateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        return this.updateStepOneAdditionalUseCase.execute(id, updateDto);
    }
    async patchIsActiveStepOneAdditional(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto> {
        return this.patchIsActiveStepOneAdditionalUseCase.execute(id, patchDto);
    }
    async patchSuccessFlagStepOneAdditional(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto> {
        return this.patchSuccessFlagStepOneAdditionalUseCase.execute(id, patchDto);
    }

}