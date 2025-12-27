import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StepOneService } from "src/vehicle-service-review-step-one/application/step-one.service";
import { CreateStepOneDto } from "../dtos/create-step-one.dto";
import { DamageCar } from "src/shared/enum/vehicle-service-review-step-one/step-one.enum";

@ApiTags('Vehicle Service Review Step One')
@Controller('step-one')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT-auth')
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
                    success_flag: false,
                    is_active: true,
                    created_by: '550e8400-e29b-41d4-a716-446655440000',
                },
            },
        },
    })
    async createStepOne(@Body() createDto: CreateStepOneDto) {
        return this.stepOneService.createStepOne(createDto);
    }
}
