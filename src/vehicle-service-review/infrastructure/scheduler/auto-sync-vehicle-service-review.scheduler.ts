import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AutoSyncVehicleServiceReviewUseCase } from 'src/vehicle-service-review/application/commands/auto-sync-vehicle-service-review.use-case';

@Injectable()
export class AppointmentSyncScheduler {
  private readonly logger = new Logger(AppointmentSyncScheduler.name);

  constructor(private readonly autoSyncVehicleServiceReviewUseCase: AutoSyncVehicleServiceReviewUseCase) {}

  @Cron('*/30 * * * *')
  async syncAppointments() {
    this.logger.log('Starting appointment sync job...');
    
    try {
      await this.autoSyncVehicleServiceReviewUseCase.execute('system'); // ใช้ 'system' เป็น employeeId สำหรับงานที่รันโดย scheduler
      this.logger.log('Appointment sync completed successfully');
    } catch (error) {
      this.logger.error('Appointment sync failed:', error);
    }
  }
}