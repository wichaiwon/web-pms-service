import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { StepTwoService } from "src/vehicle-service-review-step-two/application/step-two.service";
import { CreateStepTwoDto } from "../dtos/create-step-two.dto";
import { StepTwoDto } from "../dtos/step-two.dto";
import { Cargo, SpareTire, TireCondition, TireDepth, TruckToolSet, WheelControlCover } from "src/shared/enum/vehicle-service-review-step-two/step-two.enum";
import { UpdateStepTwoDto } from "../dtos/update-step-two.dto";
import { PatchStepTwoDto } from "../dtos/patch-step-two.dto";
import { CreateStepTwoAdditionalDto } from "../dtos/create-step-two-additional.dto";
import { StepTwoAdditionalDto } from "../dtos/step-two-additional.dto";
import { UpdateStepTwoAdditionalDto } from "../dtos/update-step-two-additional.dto";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";

@ApiTags('Vehicle Service Review Step Two')
@Controller('step-two')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StepTwoController {
    constructor(
        private readonly stepTwoService: StepTwoService,
    ) { }

    @Get('/:id')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Two by ID' })
    async getStepTwoById(@Param('id') id: string): Promise<StepTwoDto | null> {
        return this.stepTwoService.getStepTwoById(id);
    }

    @Get('/review/:reviewId')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Two by Review ID' })
    async getStepTwoByReviewId(@Param('reviewId') reviewId: string): Promise<StepTwoDto | null> {
        return this.stepTwoService.getStepTwoByReviewId(reviewId);
    }

    @Post('create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step Two' })
    @ApiBody({
        type: CreateStepTwoDto,
        description: 'Data for creating Vehicle Service Review Step Two',
        examples: {
            example1: {
                summary: 'Create Step Two Example',
                value: {
                    vehicle_service_review_id: '123e4567-e89b-12d3-a456-426614174000',
                    spare_tire: SpareTire.HAVE,
                    wheel_control_cover: WheelControlCover.HAVE,
                    cargo: Cargo.HAVE,
                    truck_tool_set: TruckToolSet.HAVE,
                    left_front_tire_year: '25',
                    right_front_tire_year: '25',
                    left_back_tire_year: '25',
                    right_back_tire_year: '25',
                    left_front_tire_pressure: 32,
                    right_front_tire_pressure: 32,
                    left_back_tire_pressure: 32,
                    right_back_tire_pressure: 32,
                    left_front_tire_depth: TireDepth.TWO,
                    right_front_tire_depth: TireDepth.TWO,
                    left_back_tire_depth: TireDepth.TWO,
                    right_back_tire_depth: TireDepth.TWO,
                    left_front_tire_condition: TireCondition.CHANGE_IMMEDIATELY,
                    right_front_tire_condition: TireCondition.NORMAL,
                    left_back_tire_condition: TireCondition.SHOULD_CHANGE,
                    right_back_tire_condition: TireCondition.CHANGE_IMMEDIATELY,
                    created_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async createStepTwo(@Body() createDto: CreateStepTwoDto): Promise<StepTwoDto> {
        return this.stepTwoService.createStepTwo(createDto);
    }

    @Post('create-multiple')
    @ApiOperation({ summary: 'Create Multiple Vehicle Service Review Step Two' })
    @ApiBody({
        type: [CreateStepTwoDto],
        description: 'Array of data for creating multiple Vehicle Service Review Step Two',
        examples: {
            example1: {
                summary: 'Create Multiple Step Two Example',
                value: [
                    {
                        vehicle_service_review_id: '123e4567-e89b-12d3-a456-426614174000',
                        spare_tire: SpareTire.HAVE,
                        wheel_control_cover: WheelControlCover.HAVE,
                        cargo: Cargo.HAVE,
                        truck_tool_set: TruckToolSet.HAVE,
                        left_front_tire_year: '25',
                        right_front_tire_year: '25',
                        left_back_tire_year: '25',
                        right_back_tire_year: '25',
                        left_front_tire_pressure: 32,
                        right_front_tire_pressure: 32,
                        left_back_tire_pressure: 32,
                        right_back_tire_pressure: 32,
                        left_front_tire_depth: TireDepth.TWO,
                        right_front_tire_depth: TireDepth.TWO,
                        left_back_tire_depth: TireDepth.TWO,
                        right_back_tire_depth: TireDepth.TWO,
                        left_front_tire_condition: TireCondition.CHANGE_IMMEDIATELY,
                        right_front_tire_condition: TireCondition.NORMAL,
                        left_back_tire_condition: TireCondition.SHOULD_CHANGE,
                        right_back_tire_condition: TireCondition.CHANGE_IMMEDIATELY,
                        created_by: '550e8400-e29b-41d4-a716-446655440000',
                    },
                    {
                        vehicle_service_review_id: '223e4567-e89b-12d3-a456-426614174000',
                        spare_tire: SpareTire.NOT_HAVE,
                        wheel_control_cover: WheelControlCover.NOT_COMPLETE,
                        cargo: Cargo.NOT_HAVE,
                        truck_tool_set: TruckToolSet.NOT_COMPLETE,
                        left_front_tire_year: '24',
                        right_front_tire_year: '24',
                        left_back_tire_year: '24',
                        right_back_tire_year: '24',
                        left_front_tire_pressure: 30,
                        right_front_tire_pressure: 30,
                        left_back_tire_pressure: 30,
                        right_back_tire_pressure: 30,
                        left_front_tire_depth: TireDepth.FOUR,
                        right_front_tire_depth: TireDepth.FOUR,
                        left_back_tire_depth: TireDepth.FOUR,
                        right_back_tire_depth: TireDepth.FOUR,
                        left_front_tire_condition: TireCondition.NORMAL,
                        right_front_tire_condition: TireCondition.NORMAL,
                        left_back_tire_condition: TireCondition.NORMAL,
                        right_back_tire_condition: TireCondition.NORMAL,
                        created_by: '550e8400-e29b-41d4-a716-446655440000',
                    },
                ],
            },
        },
    })
    async createStepTwos(@Body() createDtos: CreateStepTwoDto[]): Promise<StepTwoDto[]> {
        return this.stepTwoService.createStepTwos(createDtos);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Update Vehicle Service Review Step Two' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two to update' })
    @ApiBody({
        type: UpdateStepTwoDto,
        description: 'Data for updating Vehicle Service Review Step Two',
        examples: {
            example1: {
                summary: 'Update Step Two Example',
                value: {
                    spare_tire: SpareTire.HAVE,
                    wheel_control_cover: WheelControlCover.HAVE,
                    cargo: Cargo.HAVE,
                    truck_tool_set: TruckToolSet.HAVE,
                    left_front_tire_year: '26',
                    right_front_tire_year: '26',
                    left_back_tire_year: '26',
                    right_back_tire_year: '26',
                    left_front_tire_pressure: 34,
                    right_front_tire_pressure: 34,
                    left_back_tire_pressure: 34,
                    right_back_tire_pressure: 34,
                    left_front_tire_depth: TireDepth.FOUR,
                    right_front_tire_depth: TireDepth.FOUR,
                    left_back_tire_depth: TireDepth.FOUR,
                    right_back_tire_depth: TireDepth.FOUR,
                    left_front_tire_condition: TireCondition.NORMAL,
                    right_front_tire_condition: TireCondition.NORMAL,
                    left_back_tire_condition: TireCondition.NORMAL,
                    right_back_tire_condition: TireCondition.NORMAL,
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async updateStepTwo(
        @Param('id') id: string,
        @Body() updateDto: UpdateStepTwoDto,
    ): Promise<StepTwoDto> {
        return this.stepTwoService.updateStepTwo(id, updateDto);
    }

    @Patch('is-active/:id')
    @ApiOperation({ summary: 'Patch is_active of Vehicle Service Review Step Two' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two to patch is_active' })
    @ApiBody({
        type: PatchStepTwoDto,
        description: 'Data for patching is_active of Vehicle Service Review Step Two',
        examples: {
            example1: {
                summary: 'Patch is_active Step Two Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepTwoIsActive(
        @Param('id') id: string,
        @Body() patchDto: PatchStepTwoDto,
    ): Promise<StepTwoDto> {
        return this.stepTwoService.patchStepTwoIsActive(id, patchDto);
    }
    @Patch('success-flag/:id')
    @ApiOperation({ summary: 'Patch success_flag of Vehicle Service Review Step Two' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two to patch success_flag' })
    @ApiBody({
        type: PatchStepTwoDto,
        description: 'Data for patching success_flag of Vehicle Service Review Step Two',
        examples: {
            example1: {
                summary: 'Patch success_flag Step Two Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepTwoSuccessFlag(
        @Param('id') id: string,
        @Body() patchDto: PatchStepTwoDto,
    ): Promise<StepTwoDto> {
        return this.stepTwoService.patchStepTwoSuccessFlag(id, patchDto);
    }

    @Get('additional/:id')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Two Additional by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two Additional' })
    async getStepTwoAdditionalById(@Param('id') id: string): Promise<StepTwoAdditionalDto | null> {
        return this.stepTwoService.getStepTwoAdditionalById(id);
    }

    @Get('additional/step-two/:stepTwoId')
    @ApiOperation({ summary: 'Get Vehicle Service Review Step Two Additional by Step Two ID' })
    @ApiParam({ name: 'stepTwoId', description: 'ID of the Vehicle Service Review Step Two' })
    async getStepTwoAdditionalByStepTwoId(@Param('stepTwoId') stepTwoId: string): Promise<StepTwoAdditionalDto | null> {
        return this.stepTwoService.getStepTwoAdditionalByStepTwoId(stepTwoId);
    }

    @Post('additional/create')
    @ApiOperation({ summary: 'Create Vehicle Service Review Step Two Additional' })
    @ApiBody({
        type: CreateStepTwoAdditionalDto,
        description: 'Data for creating Vehicle Service Review Step Two Additional',
        examples: {
            example1: {
                summary: 'Create Step Two Additional Example',
                value: {
                    vehicle_service_review_step_two_id: '123e4567-e89b-12d3-a456-426614174000',
                    left_front_tire_image: ["image1.jpg", "image2.jpg"],
                    right_front_tire_image: ["image1.jpg", "image2.jpg"],
                    left_back_tire_image: ["image1.jpg", "image2.jpg"],
                    right_back_tire_image: ["image1.jpg", "image2.jpg"],
                    Comment: 'All tires are in good condition.',
                    created_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async createStepTwoAdditional(@Body() createDto: CreateStepTwoAdditionalDto): Promise<StepTwoAdditionalDto> {
        return this.stepTwoService.createStepTwoAdditional(createDto);
    }
    @Put('additional/update/:id')
    @ApiOperation({ summary: 'Patch is_active of Vehicle Service Review Step Two Additional' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two Additional to update' })
    @ApiBody({
        type: UpdateStepTwoAdditionalDto,
        description: 'Data for patching is_active of Vehicle Service Review Step Two Additional',
        examples: {
            example1: {
                summary: 'Patch is_active Step Two Additional Example',
                value: {
                    is_active: false,
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async updateStepTwoAdditional(
        @Param('id') id: string,
        @Body() updateDto: UpdateStepTwoAdditionalDto,
    ): Promise<StepTwoAdditionalDto> {
        return this.stepTwoService.updateStepTwoAdditional(id, updateDto);
    }

    @Patch('additional/is-active/:id')
    @ApiOperation({ summary: 'Patch is_active of Vehicle Service Review Step Two Additional' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two Additional to patch is_active' })
    @ApiBody({
        type: PatchStepTwoDto,
        description: 'Data for patching is_active of Vehicle Service Review Step Two Additional',
        examples: {
            example1: {
                summary: 'Patch is_active Step Two Additional Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepTwoAdditionalIsActive(
        @Param('id') id: string,
        @Body() patchDto: PatchStepTwoDto,
    ): Promise<StepTwoAdditionalDto> {
        return this.stepTwoService.patchStepTwoAdditionalIsActive(id, patchDto);
    }

    @Patch('additional/success-flag/:id')
    @ApiOperation({ summary: 'Patch success_flag of Vehicle Service Review Step Two Additional' })
    @ApiParam({ name: 'id', description: 'ID of the Vehicle Service Review Step Two Additional to patch success_flag' })
    @ApiBody({
        type: PatchStepTwoDto,
        description: 'Data for patching success_flag of Vehicle Service Review Step Two Additional',
        examples: {
            example1: {
                summary: 'Patch success_flag Step Two Additional Example',
                value: {
                    updated_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async patchStepTwoAdditionalSuccessFlag(
        @Param('id') id: string,
        @Body() patchDto: PatchStepTwoDto,
    ): Promise<StepTwoAdditionalDto> {
        return this.stepTwoService.patchStepTwoAdditionalSuccessFlag(id, patchDto);
    }
}
