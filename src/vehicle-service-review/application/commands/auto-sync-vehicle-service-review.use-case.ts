import { Inject, Injectable } from "@nestjs/common";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";
import type { IVehicleServiceReviewRepositoryInterface } from "src/vehicle-service-review/domain/interfaces/vehicle-service-review.repository.interface";
import { Branch } from "src/shared/enum/employee/employee.enum";
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from "src/shared/enum/vehicle-service-review.enum";
import { CreateVehicleServiceReviewDto } from "src/vehicle-service-review/interfaces/dtos/create-vehicle-service-review.dto";


@Injectable()
export class AutoSyncVehicleServiceReviewUseCase {
    constructor(
        @Inject('IVehicleServiceReviewRepository')
        private readonly vehicleServiceReviewRepository: IVehicleServiceReviewRepositoryInterface,
        @Inject('IEmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository,
    ) { }

    async execute(employeeId: string): Promise<{ synced: number; skipped: number; errors: number }> {
        // 1. ดึงข้อมูลจาก n8n ผ่าน repository
        const appointmentData = await this.vehicleServiceReviewRepository.autoSyncVehicleServiceReview();

        if(!appointmentData || !Array.isArray(appointmentData) || appointmentData.length === 0) {
            console.log('No appointment found to sync')
            return { synced: 0, skipped: 0, errors: 0 };
        }

        console.log(`Found ${appointmentData.length} appointments to sync`);

        let synced = 0;
        let skipped = 0;
        let errors = 0;

        // 2. วนลูปบันทึกข้อมูลแต่ละรายการ
        for (const appointment of appointmentData) {
            try {
                // ตรวจสอบว่ามี appointment_running ซ้ำหรือไม่
                if (appointment.appointment_running) {
                    const existing = await this.vehicleServiceReviewRepository.findByAppointmentRunning(appointment.appointment_running);
                    if (existing) {
                        console.log(`Skipping duplicate appointment: ${appointment.appointment_running}`);
                        skipped++;
                        continue;
                    }
                }

                // แปลงข้อมูลให้ตรงกับ CreateVehicleServiceReviewDto
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
                    responsible: appointment.responsible || [],
                    vin_number: appointment.vin_number,
                    engine_number: appointment.engine_number,
                    chassis_number: appointment.chassis_number,
                    branch_booked: appointment.branch_booked as Branch, // แปลง string เป็น enum
                    lift: appointment.lift,
                    car_type: appointment.car_type as CarType,
                    car_brand: appointment.car_brand as CarBrand,
                    status_repair_order: appointment.status_repair_order as StatusRepairOrder,
                    status_report: appointment.status_report as StatusReport,
                    created_by: employeeId,
                };

                // บันทึกข้อมูล
                await this.vehicleServiceReviewRepository.createVehicleServiceReview(dataToCreate);
                synced++;
                console.log(`Synced appointment: ${appointment.appointment_running || 'N/A'}`);
            } catch (error) {
                console.error(`Error syncing appointment ${appointment.appointment_running || 'N/A'}:`, error.message);
                errors++;
            }
        }

        console.log(`Sync completed: ${synced} synced, ${skipped} skipped, ${errors} errors`);
        return { synced, skipped, errors };
    }

}