import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { VehicleServiceReviewDetailService } from "src/vehicle-service-review-detail/application/vehicle-service-review-detail.service";
import { CreateVehicleServiceReviewDetailDto } from "../dtos/create-vehicle-service-review-detail.dto";
import { VehicleServiceReviewDetailDto } from "../dtos/vehicle-service-review-detail.dto";

@ApiTags('Vehicle Service Review Details')
@Controller('vehicle-service-review-detail')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT-auth')

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
                    created_by: "fe28d42a-b928-4665-afc9-3d43a3609f36"
                }
            }
        }
    })
    async createVehicleServiceReviewDetail(@Body() createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto> {
        return await this.vehicleServiceReviewDetailService.createVehicleServiceReviewDetail(createDto);
    }
    
    @Post('create-multiple')
    @ApiOperation({
        summary: 'Create multiple vehicle service review details',
        description: 'Create multiple vehicle service review detail records.'
    })
    @ApiBody({
        type: [CreateVehicleServiceReviewDetailDto],
        description: 'Array of vehicle service review detail data to create',
        examples: {
            example1: {
                summary: 'Sample multiple vehicle service review details',
                value: [
                    {
                        vehicle_service_review_id: "e7b8c2a0-4f1e-4e7a-9c2d-3b6f7a8e2d1f",
                        session_id: "session_12345",
                        image1: "http://example.com/image1.jpg",
                        image2: "http://example.com/image2.jpg",
                        mileage: 15000,
                        fuel_level: 25,
                        created_by: "fe28d42a-b928-4665-afc9-3d43a3609f36"
                    },
                    {
                        vehicle_service_review_id: "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
                        session_id: "session_67890",
                        image1: "http://example.com/image3.jpg",
                        image2: "http://example.com/image4.jpg",
                        mileage: 20000,
                        fuel_level: 50,
                        created_by: "fe28d42a-b928-4665-afc9-3d43a3609f36"
                    }
                ]
            }
        }
    })
    async createMultipleVehicleServiceReviewDetails(@Body() createDto: CreateVehicleServiceReviewDetailDto[]): Promise<VehicleServiceReviewDetailDto[]> {
        return this.vehicleServiceReviewDetailService.createVehicleServiceReviewDetails(createDto);
    }
}
