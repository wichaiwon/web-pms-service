import { Branch } from "src/shared/enum/employee/employee.enum";
import { VehicleServiceReview } from "../entities/vehicle-service-review.entity";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { UpdateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/update-vehicle-service-review.dto";
import { PatchVehicleServiceReviewInProcessDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-in-process.dto";
import { PatchVehicleServiceReviewSuccessFlagDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-success-flag.dto";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";

export interface IVehicleServiceReviewRepositoryInterface {
    fetchAppointmentsFromN8n(): Promise<CreateVehicleServiceReviewDto[]>;
    findByAppointmentRunning(appointmentRunning: string): Promise<VehicleServiceReview | null>;
    getVehicleServiceReview(branch: Branch, is_active: boolean, date_booked: string): Promise<VehicleServiceReview[]>;
    createVehicleServiceReview(create: CreateVehicleServiceReviewDto): Promise<VehicleServiceReview>;
    createVehicleServiceReviews(creates: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReview[]>;
    getVehicleServiceReviewById(id: string): Promise<VehicleServiceReview>;
    updateVehicleServiceReview(id: string, update: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReview>;
    patchInProcessFlag(id: string, patchInprocess: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReview>;
    patchSuccessFlag(id: string, patchSuccess: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReview>;
    patchIsActive(id: string, patchActiveStatus: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReview>;
}
