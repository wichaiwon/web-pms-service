import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";
import { VehicleServiceReviewService } from "src/vehicle-service-review/application/vehicle-service-review.service";
import { CreateVehicleServiceReviewDto } from "../dtos/create-vehicle-service-review.dto";

@ApiTags('Vehicle Service Reviews')
@Controller('vehicle-service-review')
export class VehicleServiceReviewController {
    constructor(
        private readonly vehicleServiceReviewService: VehicleServiceReviewService,
    ) { }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Create vehicle service reviews',
        description: 'Create vehicle service reviews in bulk. Requires JWT authentication.'
    })
    @ApiBody({
        type: CreateVehicleServiceReviewDto,
        description: 'Array of vehicle service review data to create',
        examples: {
            single: {
                summary: 'Create single vehicle service review',
                value: {
                    walk_in_flag: true,
                    appointment_running: null,
                    vin_number: "TFS1234567890",
                    engine_number: "ENG1234567890",
                    chassis_number: "CHS1234567890",
                    vehicle_registration: "กข 1234",
                    vehicle_registration_province: "กท",
                    model_number: "NLR85A",
                    model_name: "ISUZU ELF",
                    customer_firstname: "สมชาย",
                    customer_lastname: "ใจดี",
                    customer_contact: "0812345678",
                    lift: "Y",
                    branch_booked: "สำนักงานใหญ่",
                    date_booked: "2024-07-01",
                    time_booked: "10:00",
                    car_type: "รถยนต์ขนาดเล็ก (LCV)",
                    car_brand: "รถยนต์ ISUZU",
                    status_report: "ยังไม่ออกใบสรุปรถ",
                    status_repair_order: "ยังไม่เปิดใบสั่งซ่อม",
                    responsible: [],
                    created_by: "system"
                }
            }
        }
    })
    async createVehicleServiceReview(
        @Body() createVehicleServiceReviewDto: CreateVehicleServiceReviewDto
    ) {
        return await this.vehicleServiceReviewService.createVehicleServiceReview(createVehicleServiceReviewDto);
    }
}