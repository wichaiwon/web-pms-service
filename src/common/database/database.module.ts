import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Employee } from 'src/employee/domain/entities/employee.entity'
import { VehicleServiceReview } from 'src/vehicle-service-review/domain/entities/vehicle-service-review.entity'
import { VehicleServiceReviewDetail } from 'src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity'
import { VehicleServiceReviewDetailAdditional } from 'src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail-additional.entity'
import { VehicleServiceReviewStepOne } from 'src/vehicle-service-review-step-one/domain/entities/vehicle-service-review-step-one.entity'
import { VehicleServiceReviewStepTwo } from 'src/vehicle-service-review-step-two/domain/entities/vehicle-service-review-step-two.entity'
import { VehicleServiceReviewStepOneAdditional } from 'src/vehicle-service-review-step-one/domain/entities/vehicle-service-review-step-one-additional.entity'
import { VehicleServiceReviewStepTwoAdditional } from 'src/vehicle-service-review-step-two/domain/entities/vehicle-service-review-step-two-additional.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'web-pms-service-db'),
        entities: [
          Employee,
          VehicleServiceReview,
          VehicleServiceReviewDetail,
          VehicleServiceReviewDetailAdditional,
          VehicleServiceReviewStepOne,
          VehicleServiceReviewStepOneAdditional,
          VehicleServiceReviewStepTwo,
          VehicleServiceReviewStepTwoAdditional,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
