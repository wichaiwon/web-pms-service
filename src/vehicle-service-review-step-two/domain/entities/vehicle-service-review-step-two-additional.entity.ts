import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { VehicleServiceReviewStepTwo } from './vehicle-service-review-step-two.entity'

@Entity('vehicle_service_review_step_two_additional')
export class VehicleServiceReviewStepTwoAdditional {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  vehicle_service_review_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'varchar', array: true, nullable: true })
  left_front_tire_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  right_front_tire_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  left_back_tire_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  right_back_tire_image: string[]

  @Column({ type: 'varchar', nullable: true })
  comment: string

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'boolean', default: true })
  is_active: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
  created_at: Date

  @Column({ type: 'uuid', nullable: false })
  created_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string
  
  @ManyToOne(() => VehicleServiceReviewStepTwo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_service_review_id' })
  vehicle_service_review_step_two: VehicleServiceReviewStepTwo
}
