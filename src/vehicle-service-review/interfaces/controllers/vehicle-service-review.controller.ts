import { Body, Controller, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";
import { VehicleServiceReviewService } from "src/vehicle-service-review/application/vehicle-service-review.service";
import { CreateVehicleServiceReviewDto } from "../dtos/create-vehicle-service-review.dto";
import { UpdateVehicleServiceReviewDto } from "../dtos/update-vehicle-service-review.dto";
import { PatchVehicleServiceReviewInProcessDto } from "../dtos/patch-vehicle-service-review-in-process.dto";
import { PatchVehicleServiceReviewIsActiveDto } from "../dtos/patch-vehicle-service-review-is-active.dto";
import { PatchVehicleServiceReviewSuccessFlagDto } from "../dtos/patch-vehicle-service-review-success-flag.dto";

@ApiTags('Vehicle Service Reviews')
@Controller('vehicle-service-review')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class VehicleServiceReviewController {
    constructor(
        private readonly vehicleServiceReviewService: VehicleServiceReviewService,
    ) { }

    @Post('create')
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

    @Put(':id')
    @ApiOperation({
        summary: 'Update vehicle service review',
        description: 'Update a vehicle service review by ID. Requires JWT authentication.'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID of the vehicle service review to update',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    })
    @ApiBody({
        type: UpdateVehicleServiceReviewDto,
        description: 'Vehicle service review data to update',
        examples: {
            update: {
                summary: 'Update vehicle service review',
                value: {
                    success_flag: true,
                    in_process_flag: false,
                    appointment_running: "19996",
                    vehicle_registration: "กข 1234ถ",
                    vehicle_registration_province: "จบ",
                    model_number: "NLR85Aฟฟ",
                    model_name: "ISUZU ELFหหห",
                    customer_firstname: "สมชายกกกก",
                    customer_lastname: "ใจดีแแแแ",
                    customer_contact: "0812345678ๅๅๅๅ",
                    date_booked: "2024-07-02",
                    time_booked: "10:15",
                    branch_booked: "นายายอาม",
                    responsible: ["edc6a03a-6285-4a09-aab6-decb494cf522"],
                    car_brand: "รถยนต์ ISUZU",
                    car_type: "รถยนต์ขนาดเล็ก (LCV)",
                    status_report: "ยังไม่ออกใบสรุปรถ",
                    status_repair_order: "ยังไม่เปิดใบสั่งซ่อม",
                    updated_by: "edc6a03a-6285-4a09-aab6-decb494cf522"
                }
            }
        }
    })
    async updateVehicleServiceReview(@Param('id') id: string, @Body() updateVehicleServiceReviewDto: UpdateVehicleServiceReviewDto) {
        //responsible เอา string เพิ่มเข้าไปใน array
        return await this.vehicleServiceReviewService.updateVehicleServiceReview(id, updateVehicleServiceReviewDto);
    }

    @Patch('in-process/:id')
    @ApiOperation({
        summary: 'Patch in-process flag of vehicle service review',
        description: 'Patch the in-process flag of a vehicle service review. Requires JWT authentication.'
    })
    @ApiBody({
        type: PatchVehicleServiceReviewInProcessDto,
        description: 'Data to patch in-process flag',
        examples: {
            patch: {
                summary: 'Patch in-process flag',
                value: {
                    in_process_flag: true,
                    updated_by: 'edc6a03a-6285-4a09-aab6-decb494cf522'
                }
            }
        }
    })
    async patchInProcessFlag(@Param('id') id: string, @Body() patchInProcessDto: PatchVehicleServiceReviewInProcessDto) {
        return await this.vehicleServiceReviewService.patchInProcessFlag(id, patchInProcessDto);
    }

    @Patch('active-status/:id')
    @ApiOperation({
        summary: 'Patch active status of vehicle service review',
        description: 'Patch the active status of a vehicle service review. Requires JWT authentication.'
    })
    @ApiBody({
        type: PatchVehicleServiceReviewInProcessDto,
        description: 'Data to patch active status',
        examples: {
            patch: {
                summary: 'Patch active status',
                value: {
                    is_active: false,
                    updated_by: 'edc6a03a-6285-4a09-aab6-decb494cf522'
                }
            }
        }
    })
    async patchActiveStatus(@Param('id') id: string, @Body() patchActiveStatusDto: PatchVehicleServiceReviewIsActiveDto) {
        return await this.vehicleServiceReviewService.patchActiveStatus(id, patchActiveStatusDto);
    }

    @Patch('success-flag/:id')
    @ApiOperation({
        summary: 'Patch success flag of vehicle service review',
        description: 'Patch the success flag of a vehicle service review. Requires JWT authentication.'
    })
    @ApiBody({
        type: PatchVehicleServiceReviewInProcessDto,
        description: 'Data to patch success flag',
        examples: {
            patch: {
                summary: 'Patch success flag',
                value: {
                    success_flag: true,
                    updated_by: 'edc6a03a-6285-4a09-aab6-decb494cf522'
                }
            }
        }
    })
    async patchSuccessFlag(@Param('id') id: string, @Body() patchSuccessDto: PatchVehicleServiceReviewSuccessFlagDto) {
        return await this.vehicleServiceReviewService.patchSuccessFlag(id, patchSuccessDto);
    }
}