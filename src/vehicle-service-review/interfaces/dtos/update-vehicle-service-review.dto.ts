import { IsUUID, IsOptional, IsEnum, IsArray, IsString, IsNotEmpty } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/vehicle-service-review/vehicle-service-review.enum'
import { Branch } from 'src/shared/enum/employee/employee.enum'

export class UpdateVehicleServiceReviewDto {


    @ApiPropertyOptional({
        description: 'Customer first name',
        example: 'สมชาย',
    })
    @IsOptional()
    @IsString()
    customer_firstname?: string

    @ApiPropertyOptional({
        description: 'Customer last name',
        example: 'ใจดี',
    })
    @IsOptional()
    @IsString()
    customer_lastname?: string

    @ApiPropertyOptional({
        description: 'Customer contact number',
        example: '0812345678',
    })
    @IsOptional()
    @IsString()
    customer_contact?: string

    @ApiPropertyOptional({
        description: 'Date booked for service',
        example: '2024-07-01',
    })
    @IsOptional()
    @IsString()
    date_booked?: string

    @ApiPropertyOptional({
        description: 'Time booked for service',
        example: '10:00',
    })
    @IsOptional()
    @IsString()
    time_booked?: string

    @ApiPropertyOptional({
        description: 'Branch where service is booked',
        enum: Branch,
        example: Branch.HEAD_OFFICE,
    })
    @IsOptional()
    @IsEnum(Branch)
    branch_booked?: Branch

    @ApiPropertyOptional({
        description: 'Vehicle registration number',
        example: 'กข 1234',
    })
    @IsOptional()
    @IsString()
    vehicle_registration?: string

    @ApiPropertyOptional({
        description: 'Vehicle registration province',
        example: 'กท',
    })
    @IsOptional()
    @IsString()
    vehicle_registration_province?: string

    @ApiPropertyOptional({
        description: 'Vehicle model number',
        example: 'TFR85HPRM1234',
    })
    @IsOptional()
    @IsString()
    model_number?: string


    @ApiPropertyOptional({
        description: 'Vehicle model name',
        example: '4door pickup',
    })
    @IsOptional()
    @IsString()
    model_name?: string


    @ApiPropertyOptional({
        description: 'Vehicle VIN number',
        example: 'MP1TFR85HPRM12345',
    })
    @IsOptional()
    @IsString()
    vin_number?: string

    @ApiPropertyOptional({
        description: 'Engine number',
        example: 'XT12345',
    })
    @IsOptional()
    @IsString()
    engine_number?: string

    @ApiPropertyOptional({
        description: 'Chassis number',
        example: 'NG01234',
    })
    @IsOptional()
    @IsString()
    chassis_number?: string

    @ApiPropertyOptional({
        description: 'Array of responsible user UUIDs',
        example: ['123e4567-e89b-12d3-a456-426614174000'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    responsible?: string[]

    @ApiPropertyOptional({
        description: 'Lift assignment',
        example: 'Lift A1',
    })
    @IsOptional()
    @IsString()
    lift?: string

    @ApiPropertyOptional({
        description: 'Car type',
        enum: CarType,
        example: CarType.LCV,
    })
    @IsOptional()
    @IsEnum(CarType)
    car_type?: CarType

    @ApiPropertyOptional({
        description: 'Car brand',
        enum: CarBrand,
        example: CarBrand.ISUZU,
    })
    @IsOptional()
    @IsEnum(CarBrand)
    car_brand?: CarBrand

    @ApiPropertyOptional({
        description: 'Repair order status',
        enum: StatusRepairOrder,
    })
    @IsOptional()
    @IsEnum(StatusRepairOrder)
    status_repair_order?: StatusRepairOrder

    @ApiPropertyOptional({
        description: 'Report status',
        enum: StatusReport,
    })
    @IsOptional()
    @IsEnum(StatusReport)
    status_report?: StatusReport

    @ApiPropertyOptional({
        description: 'User ID who updated this task',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    updated_by: string
}
