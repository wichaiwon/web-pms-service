import { Injectable } from "@nestjs/common";
import { CreateStepOneUseCase } from "./commands/create-step-one.use-case";
import { IStepOneServiceInterface } from "../domain/interfaces/step-one.service.interface";
import { CreateStepOneDto } from "../interfaces/dtos/create-step-one.dto";
import { StepOneDto } from "../interfaces/dtos/step-one.dto";
import { GetStepOneByReviewIdUseCase } from "./queries/get-step-one-by-review-id.use-case";
import { UpdateStepOneUseCase } from "./commands/update-step-one.use-case";
import { UpdateStepOneDto } from "../interfaces/dtos/update-step-one.dto";
import { PatchStepOneDto } from "../interfaces/dtos/patch-step-one.dto";
import { CreateStepOneAdditionalUseCase } from "./commands/create-step-one-additional.use-case";
import { CreateStepOneAdditionalDto } from "../interfaces/dtos/create-step-one-additional.dto";
import { StepOneAdditionalDto } from "../interfaces/dtos/step-one-additional.dto";
import { UpdateStepOneAdditionalDto } from "../interfaces/dtos/update-step-one-additional.dto";
import { UpdateStepOneAdditionalUseCase } from "./commands/update-step-one-additional.use-case";
import { PatchStepOneAdditionalIsActiveUseCase } from "./commands/patch-step-one-additional-is-active.use-case";
import { PatchStepOneAdditionalSuccessFlagUseCase } from "./commands/patch-step-one-additional-success-flag.use-case";
import { CreateStepOnesUseCase } from "./commands/create-step-ones.use-case";
import { GetStepOneByIdUseCase } from "./queries/get-step-one-by-id.use-case";
import { GetStepOneAdditionalByStepOneIdUseCase } from "./queries/get-step-one-additional-by-step-one-id.use-case";
import { GetStepOneAdditionalByIdUseCase } from "./queries/get-step-one-additional-by-id.use-case";
import { PatchStepOneUseIsActiveCase } from "./commands/patch-step-one-is-active.use-case";
import { PatchStepOneSuccessFlagUseCase } from "./commands/patch-step-one-success-flag.use-case";

@Injectable()
export class StepOneService implements IStepOneServiceInterface {
    constructor(
        private readonly getStepOneByIdUseCase: GetStepOneByIdUseCase,
        private readonly getStepOneByReviewIdUseCase: GetStepOneByReviewIdUseCase,
        private readonly createStepOneUseCase: CreateStepOneUseCase,
        private readonly createStepOnesUseCase: CreateStepOnesUseCase,
        private readonly updateStepOneUseCase: UpdateStepOneUseCase,
        private readonly patchStepOneIsActiveUseCase: PatchStepOneUseIsActiveCase,
        private readonly patchStepOneSuccessFlagUseCase: PatchStepOneSuccessFlagUseCase,
        private readonly getStepOneAdditionalByIdUseCase: GetStepOneAdditionalByIdUseCase,
        private readonly getStepOneAdditionalByStepOneIdUseCase: GetStepOneAdditionalByStepOneIdUseCase,
        private readonly createStepOneAdditionalUseCase: CreateStepOneAdditionalUseCase,
        private readonly updateStepOneAdditionalUseCase: UpdateStepOneAdditionalUseCase,
        private readonly patchStepOneAdditionalIsActiveUseCase: PatchStepOneAdditionalIsActiveUseCase,
        private readonly patchStepOneAdditionalSuccessFlagUseCase: PatchStepOneAdditionalSuccessFlagUseCase,
    ) { }

    async getStepOneById(id: string): Promise<StepOneDto | null> {
        return this.getStepOneByIdUseCase.execute(id);
    }

    async getStepOneByReviewId(vehicleServiceReviewId: string): Promise<StepOneDto | null> {
        return this.getStepOneByReviewIdUseCase.execute(vehicleServiceReviewId);
    }
    async createStepOne(createDto: CreateStepOneDto): Promise<StepOneDto> {
        return this.createStepOneUseCase.execute(createDto);
    }
    async createStepOnes(createDtos: CreateStepOneDto[]): Promise<StepOneDto[]> {
        return this.createStepOnesUseCase.execute(createDtos);
    }
    async updateStepOne(id: string, updateDto: UpdateStepOneDto): Promise<StepOneDto> {
        return this.updateStepOneUseCase.execute(id, updateDto);
    }
    async patchStepOneIsActive(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        return this.patchStepOneIsActiveUseCase.execute(id, patchDto);
    }
    async patchStepOneSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<StepOneDto> {
        return this.patchStepOneSuccessFlagUseCase.execute(id, patchDto);
    }
    async getStepOneAdditionalById(id: string): Promise<StepOneAdditionalDto | null> {
        return this.getStepOneAdditionalByIdUseCase.execute(id);
    }
    async getStepOneAdditionalByStepOneId(stepOneId: string): Promise<StepOneAdditionalDto | null> {
        return this.getStepOneAdditionalByStepOneIdUseCase.execute(stepOneId);
    }
    async createStepOneAdditional(createDto: CreateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        return this.createStepOneAdditionalUseCase.execute(createDto);
    }
    async updateStepOneAdditional(id: string, updateDto: UpdateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        return this.updateStepOneAdditionalUseCase.execute(id, updateDto);
    }
    async patchStepOneAdditionalIsActive(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto> {
        return this.patchStepOneAdditionalIsActiveUseCase.execute(id, patchDto);
    }
    async patchStepOneAdditionalSuccessFlag(id: string, patchDto: PatchStepOneDto): Promise<StepOneAdditionalDto> {
        return this.patchStepOneAdditionalSuccessFlagUseCase.execute(id, patchDto);
    }

}