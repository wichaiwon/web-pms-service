import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './common/database/database.module'
import { EmployeeModule } from './employee/employee.module'
import { VehicleServiceReviewModule } from './vehicle-service-review/vehicle-service-review.module'
import { VehicleServiceReviewDetailModule } from './vehicle-service-review-detail/vehicle-service-review-detail.module'
import { VehicleServiceReviewStepOneModule } from './vehicle-service-review-step-one/vehicle-service-review-step-one.module'
import { VehicleServiceReviewStepTwoModule } from './vehicle-service-review-step-two/vehicle-service-review-step-two.module'
import { VehicleServiceReviewStepThreeModule } from './vehicle-service-review-step-three/vehicle-step-three.module'
import { VehicleServiceReviewStepFourModule } from './vehicle-service-review-step-four/vehicle-service-review-step-four.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    EmployeeModule,
    VehicleServiceReviewModule,
    VehicleServiceReviewDetailModule,
    VehicleServiceReviewStepOneModule,
    VehicleServiceReviewStepTwoModule,
    VehicleServiceReviewStepThreeModule,
    VehicleServiceReviewStepFourModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
