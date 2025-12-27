import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Branch } from "src/shared/enum/employee/employee.enum";
import { VehicleServiceReview } from "src/vehicle-service-review/domain/entities/vehicle-service-review.entity";
import { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { PatchVehicleServiceReviewIsActiveDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-is-active.dto";
import { PatchVehicleServiceReviewInProcessDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-in-process.dto";
import { PatchVehicleServiceReviewSuccessFlagDto } from "src/vehicle-service-review/interfaces/dtos/patch-vehicle-service-review-success-flag.dto";
import { UpdateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/update-vehicle-service-review.dto";
import { Repository } from "typeorm";

@Injectable()
export class VehicleServiceReviewRepository implements IVehicleServiceReviewRepositoryInterface {
    private readonly n8nApiUrl = 'https://n8n-pmsg.agilesoftgroup.com/webhook/pms-service/appointment';

    constructor(
        @InjectRepository(VehicleServiceReview)
        private readonly vehicleServiceReviewRepository: Repository<VehicleServiceReview>,
        private readonly httpService: HttpService,
    ) { }

    async fetchAppointmentsFromN8n(): Promise<VehicleServiceReview[]> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(this.n8nApiUrl)
            );
            return response.data || [];
        } catch (error) {
            console.error('Error fetching appointments from n8n:', error.message);
            console.error('Error details:', error.response?.data || error);
            return [];
        }
    }

    async findByAppointmentRunning(appointmentRunning: string): Promise<VehicleServiceReview | null> {
        return await this.vehicleServiceReviewRepository.findOne({
            where: { appointment_running: appointmentRunning }
        });
    }

    async createVehicleServiceReview(createDto: CreateVehicleServiceReviewDto): Promise<VehicleServiceReview> {
        const newReview = this.vehicleServiceReviewRepository.create(createDto);
        return await this.vehicleServiceReviewRepository.save(newReview);
    }

    async createVehicleServiceReviews(createDtos: CreateVehicleServiceReviewDto[]): Promise<VehicleServiceReview[]> {
        const newReviews = this.vehicleServiceReviewRepository.create(createDtos);
        return await this.vehicleServiceReviewRepository.save(newReviews);
    }

    async getVehicleServiceReview(branch: Branch, is_active: boolean, date_booked: string): Promise<VehicleServiceReview[]> {
        return await this.vehicleServiceReviewRepository.find({
            where: {
                branch_booked: branch,
                is_active,
                date_booked,
            },
        });
    }
    async updateVehicleServiceReview(id: string, updateDto: UpdateVehicleServiceReviewDto): Promise<VehicleServiceReview> {
        // Data Access Only: Update และ return ข้อมูล
        await this.vehicleServiceReviewRepository.update(id, updateDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with UUID ${id} not found`);
        }
        return updated;
    }

    async getVehicleServiceReviewById(id: string): Promise<VehicleServiceReview> {
        const found = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return found;
    }


    async patchInProcessFlag(id: string, patchInprocessDto: PatchVehicleServiceReviewInProcessDto): Promise<VehicleServiceReview> {
        // Data Access Only: Update และ return ข้อมูล
        await this.vehicleServiceReviewRepository.update(id, patchInprocessDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return updated;
    }

    async patchSuccessFlag(id: string, patchSuccessDto: PatchVehicleServiceReviewSuccessFlagDto): Promise<VehicleServiceReview> {
        await this.vehicleServiceReviewRepository.update(id, patchSuccessDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return updated;
    }

    async patchIsActive(id: string, patchActiveStatusDto: PatchVehicleServiceReviewIsActiveDto): Promise<VehicleServiceReview> {
        await this.vehicleServiceReviewRepository.update(id, patchActiveStatusDto);
        const updated = await this.vehicleServiceReviewRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Vehicle service review with ID ${id} not found`);
        }
        return updated;
    }
}
