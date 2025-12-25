import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { VehicleServiceReviewDetailService } from "src/vehicle-service-review-detail/application/vehicle-service-review-detail.service";
import { CreateVehicleServiceReviewDetailDto } from "../dtos/create-vehicle-service-review-detail.dto";

@ApiTags('Vehicle Service Review Details')
@Controller('vehicle-service-review-detail')

export class VehicleServiceReviewDetailController {
    constructor(
        private readonly vehicleServiceReviewDetailService: VehicleServiceReviewDetailService,
    ) { }

    @Post('create')
    @ApiOperation({
        summary: 'Create vehicle service review detail',
        description: 'Create a vehicle service review detail record.'
    })
    @ApiBody({
        type: CreateVehicleServiceReviewDetailDto,
        description: 'Vehicle service review detail data to create',
        examples: {
            example1: {
                summary: 'Sample vehicle service review detail',
                value: {
                    vehicle_service_review_id: "e7b8c2a0-4f1e-4e7a-9c2d-3b6f7a8e2d1f",
                    session_id: "session_12345",
                    image1: "http://example.com/image1.jpg",
                    image2: "http://example.com/image2.jpg",
                    mileage: 15000,
                    fuel_level: 25,
                    created_by: "e7b8c2a0-4f1e-4e7a-9c2d-3b6f7a8e2d1f"
                }
            }
        }
    })
    async createVehicleServiceReviewDetails(@Body() createDto: CreateVehicleServiceReviewDetailDto) {
        return await this.vehicleServiceReviewDetailService.createVehicleServiceReviewDetail(createDto);
    }
}
