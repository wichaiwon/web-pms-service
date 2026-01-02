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
    getVehicleServiceReviewById(id: string): Promise<VehicleServiceReview | null>;
    createVehicleServiceReview(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReview>;
    createVehicleServiceReviews(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReview[]>;
    getVehicleServiceReviewById(id: string): Promise<VehicleServiceReview>;
    updateVehicleServiceReview(id: string, updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReview>;
    patchInProcess(id: string, patchDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReview>;
    patchSuccessFlag(id: string, patchDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReview>;
    patchIsActive(id: string, patchDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReview>;
}
