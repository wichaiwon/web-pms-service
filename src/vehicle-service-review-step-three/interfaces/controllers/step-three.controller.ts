import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";
import { StepThreeService } from "src/vehicle-service-review-step-three/application/step-three.service";
import { CreateStepThreeDto } from "../dtos/create-step-three.dto";
import { StepThreeDto } from "../dtos/step-three.dto";
import { UpdateStepThreeDto } from "../dtos/update-step-three.dto";
import { PatchStepThreeDto } from "../dtos/patch-step-three.dto";
import { CreateStepThreeAdditionalDto } from "../dtos/create-step-three-additional.dto";
import { StepThreeAdditionalDto } from "../dtos/step-three-additional.dto";
import { UpdateStepThreeAdditionalDto } from "../dtos/update-step-three-additional.dto";

@ApiTags('Vehicle Service Review Step Three')
@Controller('step-three')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StepThreeController {
    constructor(
        private readonly stepThreeService: StepThreeService,
    ) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Three by ID' })
    async getStepThreeById(@Param('id') id: string): Promise<StepThreeDto | null> {
        return this.stepThreeService.getStepThreeById(id);
    }

    @Get('/review/:reviewId')
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
                    first_battery_voltage: 12.5,
                    first_measurement: 5.0,
                    first_rating: 4,
                    second_battery_voltage: 12.6,
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

    @Post('create-multiple')
    @ApiOperation({ summary: 'Create Multiple Vehicle Service Review Step Three Entries' })
    @ApiBody({
        type: [CreateStepThreeDto],
        description: 'Payload to create multiple Vehicle Service Review Step Three entries',
        examples: {
            example1: {
                summary: 'Create Multiple Step Three Entries Example',
                value: [
                    {
                        vehicle_service_review_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                        first_battery_voltage: 12.5,
                        first_measurement: 5.0,
                        first_rating: 4,
                        second_battery_voltage: 12.6,
                        second_measurement: 4.8,
                        second_rating: 5,
                        created_by: '123e4567-e89b-12d3-a456-426614174000',
                    },
                    {
                        vehicle_service_review_id: 'b2c3d4e5-f678-90ab-cdef-1234567890ab',
                        first_battery_voltage: 12.7,
                        first_measurement: 5.2,
                        first_rating: 5,
                        second_battery_voltage: 12.8,
                        second_measurement: 5.0,
                        second_rating: 5,
                        created_by: '123e4567-e89b-12d3-a456-426614174000',
                    },
                ],
            },
        },
    })
    async createStepThrees(@Body() createDtos: CreateStepThreeDto[]): Promise<StepThreeDto[]> {
        return this.stepThreeService.createStepThrees(createDtos);
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
                    first_battery_voltage: 12.7,
                    first_measurement: 5.2,
                    first_rating: 5,
                    second_battery_voltage: 12.8,
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
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Three to patch success flag' })
    @ApiBody({
        type: PatchStepThreeDto,
        description: 'Payload to patch Vehicle Service Review Step Three success flag',
        examples: {
            example1: {
                summary: 'Patch Step Three Success Flag Example',
                value: {
                    updated_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async patchStepThreeSuccessFlag(@Param('id') id: string, @Body() patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeService.patchStepThreeSuccessFlag(id, patchDto);
    }
    @Patch('is-active/:id')
    @ApiOperation({ summary: 'Patch Vehicle Service Review Step Three Is Active Flag' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Three to patch is active flag' })
    @ApiBody({
        type: PatchStepThreeDto,
        description: 'Payload to patch Vehicle Service Review Step Three is active flag',
        examples: {
            example1: {
                summary: 'Patch Step Three Is Active Flag Example',
                value: {
                    updated_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async patchStepThreeIsActive(@Param('id') id: string, @Body() patchDto: PatchStepThreeDto): Promise<StepThreeDto> {
        return this.stepThreeService.patchStepThreeIsActive(id, patchDto);
    }

    @Get('additional/:id')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Three Additional by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Three Additional to retrieve' })
    async getStepThreeAdditionalById(@Param('id') id: string): Promise<StepThreeAdditionalDto | null> {
        return this.stepThreeService.getStepThreeAdditionalById(id);
    }

    @Get('additional/step-three/:stepThreeId')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Three Additional by Step Three ID' })
    @ApiParam({ name: 'stepThreeId', description: 'ID of the Vehicle Service Review Step Three to retrieve additional info for' })
    async getStepThreeAdditionalByStepThreeId(@Param('stepThreeId') stepThreeId: string): Promise<StepThreeAdditionalDto | null> {
        return this.stepThreeService.getStepThreeAdditionalByStepThreeId(stepThreeId);
    }

    @Post('additional/create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step Three Additional' })
    @ApiBody({
        type: CreateStepThreeAdditionalDto,
        description: 'Payload to create Vehicle Service Review Step Three Additional',
        examples: {
            example1: {
                summary: 'Create Step Three Additional Example',
                value: {
                    vehicle_service_review_step_three_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    additional_image: ['image1.jpg', 'image2.jpg'],
                    comment: 'This is an additional comment for step three.',
                    created_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async createStepThreeAdditional(@Body() createDto: CreateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeService.createStepThreeAdditional(createDto);
    }
    @Put('additional/update/:id')
    @ApiOperation({ summary: 'Update Vehicle Service Review Step Three Additional' })
    @ApiBody({
        type: UpdateStepThreeAdditionalDto,
        description: 'Payload to update Vehicle Service Review Step Three Additional',
        examples: {
            example1: {
                summary: 'Update Step Three Additional Example',
                value: {
                    additional_image: ['updated_image1.jpg', 'updated_image2.jpg'],
                    comment: 'This is an updated additional comment for step three.',
                    updated_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async updateStepThreeAdditional(@Param('id') id: string, @Body() updateDto: UpdateStepThreeAdditionalDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeService.updateStepThreeAdditional(id, updateDto);
    }
    @Patch('additional/is-active/:id')
    @ApiOperation({ summary: 'Patch Vehicle Service Review Step Three Additional Is Active Flag' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Three Additional to patch is active flag' })
    @ApiBody({
        type: PatchStepThreeDto,
        description: 'Payload to patch Vehicle Service Review Step Three Additional is active flag',
        examples: {
            example1: {
                summary: 'Patch Step Three Additional Is Active Flag Example',
                value: {
                    updated_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async patchStepThreeAdditionalIsActive(@Param('id') id: string, @Body() patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeService.patchStepThreeAdditionalIsActive(id, patchDto);
    }
    @Patch('additional/success-flag/:id')
    @ApiOperation({ summary: 'Patch Vehicle Service Review Step Three Additional Success Flag' })
    @ApiBody({
        type: PatchStepThreeDto,
        description: 'Payload to patch Vehicle Service Review Step Three Additional success flag',
        examples: {
            example1: {
                summary: 'Patch Step Three Additional Success Flag Example',
                value: {
                    updated_by: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    })
    async patchStepThreeAdditionalSuccessFlag(@Param('id') id: string, @Body() patchDto: PatchStepThreeDto): Promise<StepThreeAdditionalDto> {
        return this.stepThreeService.patchStepThreeAdditionalSuccessFlag(id, patchDto);
    }
}