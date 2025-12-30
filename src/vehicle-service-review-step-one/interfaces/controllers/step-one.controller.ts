import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
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

    @Get(':id')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step One by ID' })
    async getStepOneById(@Param('id') id: string) {
        return this.stepOneService.getStepOneById(id);
    }

    @Get('review/:vehicleServiceReviewId')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step One by Review ID' })
    async getStepOneByReviewId(@Param('vehicleServiceReviewId') vehicleServiceReviewId: string) {
        return this.stepOneService.getStepOneByReviewId(vehicleServiceReviewId);
    }

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

    @Post('create-multiple')
    @ApiOperation({ summary: 'Create Multiple Vehicle Service Review Step Ones' })
    @ApiBody({
        type: [CreateStepOneDto],
        description: 'Array of data for creating multiple Vehicle Service Review Step Ones',
        examples: {
            example1: {
                summary: 'Sample multiple details',
                value: [
                    {
                        vehicle_service_review_id: '123e4567-e89b-12d3-a456-426614174000',
                        damage_car: DamageCar.NONE,
                        damage_car_image: 'http://example.com/damage1.jpg',
                        created_by: '550e8400-e29b-41d4-a716-446655440000',
                    },
                    {
                        vehicle_service_review_id: '223e4567-e89b-12d3-a456-426614174000',
                        damage_car: DamageCar.CANNOT_CHECK,
                        damage_car_image: 'http://example.com/damage2.jpg',
                        created_by: '550e8400-e29b-41d4-a716-446655440000',
                    },
                ],
            },
        },
    })
    async createStepOnes(@Body() createDtos: CreateStepOneDto[]) {
        return this.stepOneService.createStepOnes(createDtos);
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
    @ApiOperation({
        summary: 'Patch Is Active Status of Vehicle Service Review Step One',
        description: 'Toggle the is_active status of a Vehicle Service Review Step One by its ID.',
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'uuid',
        description: 'The ID of the Vehicle Service Review Step One to patch',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiBody({
        type: PatchStepOneDto,
        description: 'Data for patching Is Active status of Vehicle Service Review Step One',
        examples: {
            example1: {
                summary: 'Patch Is Active Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepOneIsActive(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ) {
        return this.stepOneService.patchStepOneIsActive(id, patchDto);
    }


    @Patch('success-flag/:id')
    @ApiOperation({
        summary: 'Patch Success Flag of Vehicle Service Review Step One',
        description: 'Toggle the success_flag of a Vehicle Service Review Step One by its ID.',
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'uuid',
        description: 'The ID of the Vehicle Service Review Step One to patch',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiBody({
        type: PatchStepOneDto,
        description: 'Data for patching Success Flag of Vehicle Service Review Step One',
        examples: {
            example1: {
                summary: 'Patch Success Flag Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchSuccessFlagStepOne(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ) {
        return this.stepOneService.patchStepOneSuccessFlag(id, patchDto);
    }

    @Get('additional/:id')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step One Additional by ID' })
    async getStepOneAdditionalById(@Param('id') id: string): Promise<StepOneAdditionalDto | null> {
        return this.stepOneService.getStepOneAdditionalById(id);
    }

    @Get('additional/step-one/:stepOneId')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step One Additional by Step One ID' })
    async getStepOneAdditionalByStepOneId(@Param('stepOneId') stepOneId: string): Promise<StepOneAdditionalDto | null> {
        return this.stepOneService.getStepOneAdditionalByStepOneId(stepOneId);
    }

    @Post('additional/create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step One Additional' })
    @ApiBody({
        type: CreateStepOneAdditionalDto,
        description: 'Data for creating Vehicle Service Review Step One Additional',
        examples: {
            example1: {
                summary: 'Create Step One Additional Example',
                value: {
                    vehicle_service_review_step_one_id: '123e4567-e89b-12d3-a456-426614174000',
                    additional_image: ['http://example.com/additional1.jpg'],
                    comment: 'Additional comments about the step one review.',
                    created_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async createStepOneAdditional(
        @Body() createDto: CreateStepOneAdditionalDto,
    ): Promise<StepOneAdditionalDto> {
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
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'uuid',
        description: 'The ID of the Vehicle Service Review Step One Additional to patch',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiBody({
        type: PatchStepOneDto,
        description: 'Data for patching Is Active status of Vehicle Service Review Step One Additional',
        examples: {
            example1: {
                summary: 'Patch Is Active Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchIsActiveStepOneAdditional(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ): Promise<StepOneAdditionalDto> {
        return this.stepOneService.patchStepOneAdditionalIsActive(id, patchDto);
    }

    @Patch('additional/success-flag/:id')
    @ApiOperation({ summary: 'Patch Success Flag of Vehicle Service Review Step One Additional' })
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'uuid',
        description: 'The ID of the Vehicle Service Review Step One Additional to patch',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiBody({
        type: PatchStepOneDto,
        description: 'Data for patching Success Flag of Vehicle Service Review Step One Additional',
        examples: {
            example1: {
                summary: 'Patch Success Flag Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchSuccessFlagStepOneAdditional(
        @Param('id') id: string,
        @Body() patchDto: PatchStepOneDto,
    ): Promise<StepOneAdditionalDto> {
        return this.stepOneService.patchStepOneAdditionalSuccessFlag(id, patchDto);
    }
}
