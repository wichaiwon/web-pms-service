import { Injectable, Inject } from "@nestjs/common";
import { EmployeeService } from "src/employee/application/employee.service";
import type { IDetailRepositoryInterface } from "src/vehicle-service-review-detail/domain/interfaces/detail.repository.interface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { Branch } from "src/shared/enum/employee/employee.enum";
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from "src/shared/enum/vehicle-service-review/vehicle-service-review.enum";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";
import { UpdateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/update-vehicle-service-review.dto";
import type { IStepOneRepositoryInterface } from "src/vehicle-service-review-step-one/domain/interfaces/step-one.repository.interface";
import { CreateDetailDto } from "src/vehicle-service-review-detail/interfaces/dtos/create-detail.dto";
import { CreateStepOneDto } from "src/vehicle-service-review-step-one/interfaces/dtos/create-step-one.dto";

@Injectable()
export class AutoSyncVehicleServiceReviewUseCase {
    private readonly defaultCreatedBy = 'fe28d42a-b928-4665-afc9-3d43a3609f36'; // Default employee ID if none found
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IDetailRepository')
        private readonly detailRepository: IDetailRepositoryInterface,
        private readonly employeeService: EmployeeService,
        @Inject('IStepOneRepository')
        private readonly stepOneRepository: IStepOneRepositoryInterface,
    ) { }

    async execute(): Promise<{ synced: number; skipped: number; errors: number }> {
        // 1. ดึงข้อมูลจาก n8n ผ่าน repository
        const appointmentData = await this.vehicleServiceReviewRepository.fetchAppointmentsFromN8n();

        if (!appointmentData || !Array.isArray(appointmentData) || appointmentData.length === 0) {
            console.log('No appointment found to sync')
            return { synced: 0, skipped: 0, errors: 0 };
        }

        console.log(`Found ${appointmentData.length} appointments to sync`);

        let synced = 0;
        let skipped = 0;
        let errors = 0;

        // Arrays สำหรับ bulk insert
        const detailsToCreate: CreateDetailDto[] = [];
        const stepOnesToCreate: CreateStepOneDto[] = [];

        // 2. วนลูปบันทึกข้อมูลแต่ละรายการ
        for (const appointment of appointmentData) {
            try {
                // Skip if no appointment_running (ไม่สามารถระบุความซ้ำซ้อนได้)
                if (!appointment.appointment_running) {
                    errors++;
                    console.warn(`Skipped appointment without running number`);
                    continue;
                }

                // จัดการ responsible - แปลงชื่อ-นามสกุลเป็น employee ID
                let responsibleIds: string[] = [];
                if (typeof appointment.responsible === 'string' && appointment.responsible) {
                    const nameParts = (appointment.responsible as string).trim().split(/\s+/);
                    if (nameParts.length >= 2) {
                        const firstname = nameParts[0];
                        const lastname = nameParts.slice(1).join(' '); // รองรับนามสกุลหลายคำ

                        try {
                            const employee = await this.employeeService.getEmployeeByFullName(firstname, lastname);
                            if (employee) {
                                responsibleIds = [employee.id];
                            } else {
                                console.warn(`Employee not found: ${firstname} ${lastname}`);
                            }
                        } catch (error) {
                            console.error(`Error finding employee ${firstname} ${lastname}:`, error.message);
                        }
                    }
                }

                // Business Logic: เช็กว่าข้อมูลซ้ำหรือไม่
                const existing = await this.vehicleServiceReviewRepository.findByAppointmentRunning(appointment.appointment_running);

                if (existing) {
                    // เช็กว่าข้อมูลเปลี่ยนแปลงหรือไม่
                    const hasChanges =
                        existing.vehicle_registration !== appointment.vehicle_registration ||
                        existing.vehicle_registration_province !== appointment.vehicle_registration_province ||
                        existing.model_number !== appointment.model_number ||
                        existing.model_name !== appointment.model_name ||
                        existing.customer_firstname !== appointment.customer_firstname ||
                        existing.customer_lastname !== appointment.customer_lastname ||
                        existing.customer_contact !== appointment.customer_contact ||
                        existing.date_booked !== appointment.date_booked ||
                        existing.time_booked !== appointment.time_booked ||
                        existing.vin_number !== appointment.vin_number ||
                        existing.engine_number !== appointment.engine_number ||
                        existing.chassis_number !== appointment.chassis_number ||
                        existing.branch_booked !== appointment.branch_booked ||
                        existing.lift !== appointment.lift ||
                        existing.car_type !== appointment.car_type ||
                        existing.car_brand !== appointment.car_brand

                    if (!hasChanges) {
                        // ข้อมูลเหมือนเดิม ไม่ต้อง update
                        skipped++;
                        continue;
                    }

                    // Update existing record
                    const dataToUpdate: UpdateVehicleServiceReviewDto = {
                        vehicle_registration: appointment.vehicle_registration,
                        vehicle_registration_province: appointment.vehicle_registration_province,
                        model_number: appointment.model_number,
                        model_name: appointment.model_name,
                        customer_firstname: appointment.customer_firstname,
                        customer_lastname: appointment.customer_lastname,
                        customer_contact: appointment.customer_contact,
                        date_booked: appointment.date_booked,
                        time_booked: appointment.time_booked,
                        responsible: responsibleIds,
                        vin_number: appointment.vin_number,
                        engine_number: appointment.engine_number,
                        chassis_number: appointment.chassis_number,
                        branch_booked: appointment.branch_booked as Branch,
                        lift: appointment.lift,
                        car_type: appointment.car_type as CarType,
                        car_brand: appointment.car_brand as CarBrand,
                        status_repair_order: appointment.status_repair_order as StatusRepairOrder,
                        status_report: appointment.status_report as StatusReport,
                        updated_by: responsibleIds[0] || 'system'
                    };

                    await this.vehicleServiceReviewRepository.updateVehicleServiceReview(existing.id, dataToUpdate);
                    synced++;
                } else {
                    // Create new record
                    const dataToCreate: CreateVehicleServiceReviewDto = {
                        walk_in_flag: appointment.walk_in_flag ?? false,
                        appointment_running: appointment.appointment_running,
                        vehicle_registration: appointment.vehicle_registration,
                        vehicle_registration_province: appointment.vehicle_registration_province,
                        model_number: appointment.model_number,
                        model_name: appointment.model_name,
                        customer_firstname: appointment.customer_firstname,
                        customer_lastname: appointment.customer_lastname,
                        customer_contact: appointment.customer_contact,
                        date_booked: appointment.date_booked,
                        time_booked: appointment.time_booked,
                        responsible: responsibleIds,
                        vin_number: appointment.vin_number,
                        engine_number: appointment.engine_number,
                        chassis_number: appointment.chassis_number,
                        branch_booked: appointment.branch_booked as Branch,
                        lift: appointment.lift,
                        car_type: appointment.car_type as CarType,
                        car_brand: appointment.car_brand as CarBrand,
                        status_repair_order: appointment.status_repair_order as StatusRepairOrder,
                        status_report: appointment.status_report as StatusReport,
                        created_by: responsibleIds[0] || this.defaultCreatedBy
                    };

                    const createdReview = await this.vehicleServiceReviewRepository.createVehicleServiceReview(dataToCreate);
                    
                    // เก็บ detail และ stepOne ไว้ใน array สำหรับ bulk insert
                    detailsToCreate.push({
                        vehicle_service_review_id: createdReview.id,
                        created_by: dataToCreate.created_by,
                    });

                    stepOnesToCreate.push({
                        vehicle_service_review_id: createdReview.id,
                        created_by: dataToCreate.created_by,
                    });
                    
                    synced++;
                }
            } catch (error) {
                console.error(`Error syncing appointment ${appointment.appointment_running || 'N/A'}:`, error.message);
                errors++;
            }
        }

        // 3. Bulk insert details และ stepOnes หลังวนลูปจบ
        if (detailsToCreate.length > 0) {
            await this.detailRepository.createDetails(detailsToCreate);
        }
        if (stepOnesToCreate.length > 0) {
            await this.stepOneRepository.createStepOnes(stepOnesToCreate);
        }

        console.log(`Sync completed: ${synced} synced, ${skipped} skipped, ${errors} errors`);
        return { synced, skipped, errors };
    }

}