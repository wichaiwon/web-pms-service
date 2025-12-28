import { DamageCar } from 'src/shared/enum/vehicle-service-review-step-one/step-one.enum'
import { VehicleServiceReview } from 'src/vehicle-service-review/domain/entities/vehicle-service-review.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { VehicleServiceReviewStepOneAdditional } from './vehicle-service-review-step-one-additional.entity'

@Entity('vehicle_service_review_step_one')
export class VehicleServiceReviewStepOne {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  vehicle_service_review_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'enum', enum: DamageCar, nullable: true })
  damage_car: DamageCar

  @Column({ type: 'varchar', nullable: true })
  damage_car_image: string

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'boolean', default: true })
  is_active: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false})
  created_at: Date

  @Column({ type: 'uuid', nullable: true })
  created_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  @ManyToOne(() => VehicleServiceReview, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_service_review_id' })
  vehicle_service_review: VehicleServiceReview
  // @OneToMany(() => VehicleServiceReviewStepOneAdditional, additional => additional.vehicleServiceReviewStepOne, { cascade: true })
  // additionals: VehicleServiceReviewStepOneAdditional[]
}
