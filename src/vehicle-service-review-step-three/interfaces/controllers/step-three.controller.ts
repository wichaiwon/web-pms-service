import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";
import { StepThreeService } from "src/vehicle-service-review-step-three/application/step-three.service";
import { CreateStepThreeDto } from "../dtos/create-step-three.dto";
import { StepThreeDto } from "../dtos/step-three.dto";
import { UpdateStepThreeDto } from "../dtos/update-step-three.dto";
import { PatchStepThreeDto } from "../dtos/patch-step-three.dto";

@ApiTags('Vehicle Service Review Step Three')
@Controller('step-three')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT-auth')
export class StepThreeController {
    constructor(
        private readonly stepThreeService: StepThreeService,
    ) { }

    @Get(':reviewId')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Three by Review ID' })
    async getStepThreeByReviewId(@Param('reviewId') reviewId: string): Promise<StepThreeDto | null> {
        return this.stepThreeService.getStepThreeByReviewId(reviewId);
    }
    @Post('create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step Three' })
    @ApiBody({
        type: CreateStepThreeDto,
        description: 'Payload to create Vehicle Service Review Step Three',
        examples: {
            example1: {
                summary: 'Create Step Three Example',
                value: {
                    vehicle_service_review_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    first_batterry_valtage: 12.5,
                    first_measurement: 5.0,
                    first_rating: 4,
                    second_batterry_valtage: 12.6,
                    second_measurement: 4.8,
                    second_rating: 5,
                    created_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async createStepThree(@Body() createDto: CreateStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeService.createStepThree(createDto);
    }
    @Put('update/:id')
    @ApiOperation({ summary: 'Update Vehicle Service Review Step Three' })
    @ApiBody({
        type: UpdateStepThreeDto,
        description: 'Payload to update Vehicle Service Review Step Three',
        examples: {
            example1: {
                summary: 'Update Step Three Example',
                value: {
                    first_batterry_valtage: 12.7,
                    first_measurement: 5.2,
                    first_rating: 5,
                    second_batterry_valtage: 12.8,
                    second_measurement: 5.0,
                    second_rating: 5,
                    updated_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async updateStepThree(@Param('id') id: string, @Body() updateDto: UpdateStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeService.updateStepThree(id, updateDto);
    }

    @Patch('success-flag/:id')
    @ApiOperation({ summary: 'Patch Vehicle Service Review Step Three Success Flag' })
    @ApiBody({
        type: PatchStepThreeDto,
        description: 'Payload to patch Vehicle Service Review Step Three success flag',
        examples: {
            example1: {
                summary: 'Patch Step Three Success Flag Example',
                value: {
                    is_successful: true,
                },
            },
        },
    })
    async patchStepThreeSuccessFlag(@Param('id') id: string, @Body() patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeService.patchStepThreeSuccessFlag(id, patchDto);
    }
    @Patch('is-active/:id')
    @ApiOperation({ summary: 'Patch Vehicle Service Review Step Three Is Active Flag' })
    @ApiBody({
        type: PatchStepThreeDto,
        description: 'Payload to patch Vehicle Service Review Step Three is active flag',
        examples: {
            example1: {
                summary: 'Patch Step Three Is Active Flag Example',
                value: {
                    is_active: false,
                },
            },
        },
    })
    async patchStepThreeIsActive(@Param('id') id: string, @Body() patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeService.patchStepThreeIsActive(id, patchDto);
    }   
}