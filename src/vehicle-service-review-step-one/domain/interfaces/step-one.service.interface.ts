import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";
import { StepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/step-one.dto";

export interface IStepOneServiceInterface {
    getStepOneByReviewId(vehicleServiceReviewId: string): Promise<StepOneDto | null>;
    createStepOne(createDto: CreateStepOneDto): Promise<StepOneDto>;
}
