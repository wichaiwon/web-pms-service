import { Body, Controller, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StepOneService } from "src/vehicle-service-review-step-one/application/step-one.service";
import { CreateStepOneDto } from "../dtos/create-step-one.dto";
import { DamageCar } from "src/shared/enum/vehicle-service-review-step-one/step-one.enum";
import { UpdateStepOneDto } from "../dtos/update-step-one.dto";
import { CreateStepOneAdditionalDto } from "../dtos/create-step-one-additional.dto";
import { StepOneAdditionalDto } from "../dtos/step-one-additional.dto";
import { UpdateStepOneAdditionalDto } from "../dtos/update-step-one-additional.dto";
import { PatchStepOneDto } from "../dtos/patch-step-one.dto";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";

@ApiTags('Vehicle Service Review Step One')
@Controller('step-one')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StepOneController {
    constructor(
        private readonly stepOneService: StepOneService,
    ) { }
    @Post('create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step One' })
    @ApiBody({
        type: CreateStepOneDto,
        description: 'Data for creating Vehicle Service Review Step One',
        examples: {
            example1: {
                summary: 'Create Step One Example',
                value: {
                    vehicle_service_review_id: '123e4567-e89b-12d3-a456-426614174000',
                    damage_car: DamageCar.NONE,
                    damage_car_image: 'http://example.com/damage.jpg',
                    created_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async createStepOne(@Body() createDto: CreateStepOneDto) {
        return this.stepOneService.createStepOne(createDto);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Update Vehicle Service Review Step One' })
    @ApiBody({
        type: UpdateStepOneDto,
        description: 'Data for updating Vehicle Service Review Step One',
        examples: {
            example1: {
                summary: 'Update Step One Example',
                value: {
                    damage_car: DamageCar.CANNOT_CHECK,
                    damage_car_image: 'http://example.com/updated_damage.jpg',
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async updateStepOne(@Body() updateDto: UpdateStepOneDto, @Param('id') id: string) {
        return this.stepOneService.updateStepOne(id, updateDto);
    }

    @Patch('is-active/:id')
    @ApiOperation({ summary: 'Patch Is Active Status of Vehicle Service Review Step One' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                is_active: {
                    type: 'boolean',
                    example: true,
                    description: 'Is Active Status',
                },
                updated_by: {
                    type: 'string',
                    format: 'uuid',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                    description: 'User ID who updates the record',
                },
            },
            required: ['is_active', 'updated_by'],
        },
        description: 'Data for patching Is Active status of Vehicle Service Review Step One',
    })
    async patchIsActive(
        @Param('id') id: string,
        @Body() patchDto: { is_active: boolean; updated_by: string },
    ) {
        return this.stepOneService.patchIsActiveStepOne(id, patchDto);
    }
    @Patch('success-flag/:id')
    @ApiOperation({ summary: 'Patch Success Flag of Vehicle Service Review Step One' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                success_flag: {
                    type: 'boolean',
                    example: true,
                    description: 'Success Flag',
                },
                updated_by: {
                    type: 'string',
                    format: 'uuid',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                    description: 'User ID who updates the record',
                },
            },
            required: ['success_flag', 'updated_by'],
        },
        description: 'Data for patching Success Flag of Vehicle Service Review Step One',
    })
    async patchSuccessFlag(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ) {
        return this.stepOneService.patchSuccessFlagStepOne(id, patchDto);
    }

    @Post('additional/create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step One Additional' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                vehicle_service_review_step_one_id: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    description: 'Vehicle Service Review Step One ID',
                },
                additional_image: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'uri',
                    },
                    example: ['http://example.com/additional1.jpg', 'http://example.com/additional2.jpg'],
                    description: 'Array of Additional Images',
                },
                comment: {
                    type: 'string',
                    example: 'Additional comments about the step one review.',
                    description: 'Comment',
                },
                created_by: {
                    type: 'string',
                    format: 'uuid',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                    description: 'User ID who creates the record',
                },
            },
            required: ['vehicle_service_review_step_one_id', 'created_by'],
        },
        description: 'Data for creating Vehicle Service Review Step One Additional',
    })
    async createStepOneAdditional(@Body() createDto: CreateStepOneAdditionalDto): Promise<StepOneAdditionalDto> {
        return this.stepOneService.createStepOneAdditional(createDto);
    }
    @Put('additional/update/:id')
    @ApiOperation({ summary: 'Update Vehicle Service Review Step One Additional' })
    @ApiBody({
        type: UpdateStepOneAdditionalDto,
        description: 'Data for updating Vehicle Service Review Step One Additional',
        examples: {
            example1: {
                summary: 'Update Step One Additional Example',
                value: {
                    additional_image: ['http://example.com/updated_additional1.jpg'],
                    comment: 'Updated additional comments about the step one review.',
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async updateStepOneAdditional(
        @Param('id') id: string,
        @Body() updateDto: UpdateStepOneAdditionalDto,
    ): Promise<StepOneAdditionalDto> {
        return this.stepOneService.updateStepOneAdditional(id, updateDto);
    }
    @Patch('additional/is-active/:id')
    @ApiOperation({ summary: 'Patch Is Active Status of Vehicle Service Review Step One Additional' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                is_active: {
                    type: 'boolean',
                    example: true,
                    description: 'Is Active Status',
                },
                updated_by: {
                    type: 'string',
                    format: 'uuid',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                    description: 'User ID who updates the record',
                },
            },
            required: ['is_active', 'updated_by'],
        },
        description: 'Data for patching Is Active status of Vehicle Service Review Step One Additional',
    })
    async patchIsActiveStepOneAdditional(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ): Promise<StepOneAdditionalDto> {
        return this.stepOneService.patchIsActiveStepOneAdditional(id, patchDto);
    }

    @Patch('additional/success-flag/:id')
    @ApiOperation({ summary: 'Patch Success Flag of Vehicle Service Review Step One Additional' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                success_flag: {
                    type: 'boolean',
                    example: true,
                    description: 'Success Flag',
                },
                updated_by: {
                    type: 'string',
                    format: 'uuid',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                    description: 'User ID who updates the record',
                },
            },
            required: ['success_flag', 'updated_by'],
        },
        description: 'Data for patching Success Flag of Vehicle Service Review Step One Additional',
    })
    async patchSuccessFlagStepOneAdditional(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ): Promise<StepOneAdditionalDto> {
        return this.stepOneService.patchSuccessFlagStepOneAdditional(id, patchDto);
    }
}
