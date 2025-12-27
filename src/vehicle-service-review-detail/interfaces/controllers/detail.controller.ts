import { Body, Controller, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateDetailDto } from "../dtos/create-detail.dto";
import { DetailDto } from "../dtos/detail.dto";
import { UpdateDetailDto } from "../dtos/update-detail.dto";
import { PatchDetailDto } from "../dtos/patch-detail.dto";
import { DetailService } from "src/vehicle-service-review-detail/application/detail.service";

@ApiTags('Details')
@Controller('detail')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT-auth')

export class DetailController {
    constructor(
        private readonly detailService: DetailService,
    ) { }

    @Post('create')
    @ApiOperation({
        summary: 'Create detail',
        description: 'Create a detail record.'
    })
    @ApiBody({
        type: CreateDetailDto,
        description: 'Detail data to create',
        examples: {
            example1: {
                summary: 'Sample detail',
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
    async createDetail(@Body() createDto: CreateDetailDto): Promise<DetailDto> {
        return await this.detailService.createDetail(createDto);
    }
    
    @Post('create-multiple')
    @ApiOperation({
        summary: 'Create multiple details',
        description: 'Create multiple detail records.'
    })
    @ApiBody({
        type: [CreateDetailDto],
        description: 'Array of detail data to create',
        examples: {
            example1: {
                summary: 'Sample multiple details',
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
    async createMultipleDetails(@Body() createDto: CreateDetailDto[]): Promise<DetailDto[]> {
        return this.detailService.createDetails(createDto);
    }

    @Put('update/:id')
    @ApiOperation({
        summary: 'Update detail',
        description: 'Update a detail record by ID.'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID of the detail to update',
        example: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9'
    })
    @ApiBody({
        type: CreateDetailDto,
        description: 'Detail data to update',
        examples: {
            example1: {
                summary: 'Sample detail update',
                value: {
                    image1: "http://example.com/image1_updated.jpg",
                    image2: "http://example.com/image2_updated.jpg",
                    mileage: 15500,
                    fuel_level: 30,
                    updated_by: "fe28d42a-b928-4665-afc9-3d43a3609f36"
                }
            }
        }
    })
    async updateDetail(@Body('id') id: string, @Body() updateDto: UpdateDetailDto): Promise<DetailDto> {
        return await this.detailService.updateDetail(id, updateDto);
    }

    @Patch('success-flag/:id')
    @ApiOperation({
        summary: 'Patch success flag of detail',
        description: 'Patch the success flag of a detail record by ID.'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID of the detail to patch',
        example: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9'
    })
    @ApiBody({
        type: PatchDetailDto,
        description: 'Data to patch success flag',
        examples: {
            example1: {
                summary: 'Sample patch success flag',
                value: {
                    success_flag: true,
                    updated_by: "fe28d42a-b928-4665-afc9-3d43a3609f36"
                }
            }
        }
    })
    async patchSuccessFlag(@Body('id') id: string, @Body() patchDto: PatchDetailDto): Promise<DetailDto> {
        return await this.detailService.patchSuccessFlag(id, patchDto);
    }

    @Patch('is-active/:id')
    @ApiOperation({
        summary: 'Patch active status of detail',
        description: 'Patch the active status of a detail record by ID.'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID of the detail to patch',
        example: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9'
    })
    @ApiBody({
        type: PatchDetailDto,
        description: 'Data to patch active status',
        examples: {
            example1: {
                summary: 'Sample patch active status',
                value: {
                    is_active: false,
                    updated_by: "fe28d42a-b928-4665-afc9-3d43a3609f36"
                }
            }
        }
    })
    async patchIsActive(@Body('id') id: string, @Body() patchDto: PatchDetailDto): Promise<DetailDto> {
        return await this.detailService.patchIsActive(id, patchDto);
    }
}
