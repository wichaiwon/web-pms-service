import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";
import { StepFourDto } from "../dtos/step-four.dto";
import { StepFourService } from "src/vehicle-service-review-step-four/application/step-four.service";
import { CreateStepfourDto } from "../dtos/create-step-four.dto";
import { SignatureStatus } from "src/shared/enum/vehicle-service-review-step-four/step-four.enum";
import { UpdateStepfourDto } from "../dtos/update-step-four.dto";
import { PatchStepfourDto } from "../dtos/patch-step-four.dto";

@ApiTags('Vehicle Service Review Step Four')
@Controller('step-four')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StepFourController {
    constructor(
         private readonly stepFourService: StepFourService,
    ) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get Step Four by ID' })
    @ApiParam({ name: 'id', description: 'Step Four ID', type: 'string', format: 'uuid' })
    async getStepFourById(@Param('id') id: string): Promise<StepFourDto | null> {
        return this.stepFourService.getStepFourById(id);
    }

    @Get('review/:reviewId')
    @ApiOperation({ summary: 'Get Step Four by Vehicle Service Review ID' })
    @ApiParam({ name: 'reviewId', description: 'Vehicle Service Review ID', type: 'string', format: 'uuid' })
    async getStepFourByReviewId(@Param('reviewId') reviewId: string): Promise<StepFourDto | null> {
        return this.stepFourService.getStepFourByReviewId(reviewId);
    }
    @Post('create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step Four' })
    @ApiBody({
        type: CreateStepfourDto,
        description: 'Data for creating Vehicle Service Review Step Four',
        examples: {
            example1: {
                summary: 'Create Step Four Example',
                value: {
                    vehicle_service_review_id: '123e4567-e89b-12d3-a456-426614174000',
                    signature_customer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
                    signature_status: SignatureStatus.SIGNED,
                    customer_absent_flag: false,
                    created_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async createStepFour(@Body() createDto: CreateStepfourDto): Promise<StepFourDto> {
        return this.stepFourService.createStepFour(createDto);
    }

    @Post('create-multiple')
    @ApiOperation({ summary: 'Create Multiple Vehicle Service Review Step Four Records' })
    @ApiBody({
        type: [CreateStepfourDto],
        description: 'Array of data for creating multiple Vehicle Service Review Step Four records',
        examples: {
            example1: {
                summary: 'Create Multiple Step Four Example',
                value: [
                    {
                        vehicle_service_review_id: '123e4567-e89b-12d3-a456-426614174000',
                        signature_customer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
                        signature_status: SignatureStatus.SIGNED,
                        customer_absent_flag: false,
                        created_by: '550e8400-e29b-41d4-a716-446655440000',
                    },
                    {
                        vehicle_service_review_id: '223e4567-e89b-12d3-a456-426614174001',
                        signature_customer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
                        signature_status: SignatureStatus.ABSENT,
                        customer_absent_flag: true,
                        created_by: '550e8400-e29b-41d4-a716-446655440000',
                    },
                ],
            },
        },
    })
    async createStepFours(@Body() createDtos: CreateStepfourDto[]): Promise<StepFourDto[]> {
        return this.stepFourService.createStepFours(createDtos);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Update Vehicle Service Review Step Four' })
    @ApiBody({
        type: UpdateStepfourDto,
        description: 'Data for updating Vehicle Service Review Step Four',
        examples: {
            example1: {
                summary: 'Update Step Four Example',
                value: {
                    signature_customer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
                    signature_status: SignatureStatus.SIGNED,
                    customer_absent_flag: false,
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    
    async updateStepFour(
        @Param('id') id: string,
        @Body() updateDto: UpdateStepfourDto,
    ): Promise<StepFourDto> {
        return this.stepFourService.updateStepFour(id, updateDto);
    }

    @Patch('success-flag/:id')
    @ApiOperation({ summary: 'Patch Success Flag of Vehicle Service Review Step Four' })
    @ApiBody({
        type: PatchStepfourDto,
        description: 'Data for patching success_flag of Vehicle Service Review Step Four',
        examples: {
            example1: {
                summary: 'Patch Success Flag Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepFourSuccessFlag(
        @Param('id') id: string,
        @Body() patchDto:PatchStepfourDto,
    ): Promise<StepFourDto> {
        return this.stepFourService.patchStepFourSuccessFlag(id, patchDto);
    }
    @Patch('is-active/:id')
    @ApiOperation({ summary: 'Patch is_active of Vehicle Service Review Step Four' })
    @ApiBody({
        type: PatchStepfourDto,
        description: 'Data for patching is_active of Vehicle Service Review Step Four',
        examples: {
            example1: {
                summary: 'Patch is_active Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepFourIsActive(
        @Param('id') id: string,
        @Body() patchDto: PatchStepfourDto,
    ): Promise<StepFourDto> {
        return this.stepFourService.patchStepFourIsActive(id, patchDto);
    }
}
