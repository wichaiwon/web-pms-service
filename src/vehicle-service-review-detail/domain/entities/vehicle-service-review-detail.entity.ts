import { FuelLevel } from 'src/shared/enum/vehicle-service-review-detail/detail.enum'
import { VehicleServiceReview } from 'src/vehicle-service-review/domain/entities/vehicle-service-review.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('vehicle_service_review_detail')
export class VehicleServiceReviewDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  vehicle_service_review_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'varchar', nullable: true })
  image1: string

  @Column({ type: 'varchar', nullable: true })
  image2: string

  @Column({ type: 'integer', nullable: true })
  mileage: number

  @Column({ type: 'enum', enum: FuelLevel, nullable: true })
  fuel_level: FuelLevel

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

  // Relations
  @ManyToOne(() => VehicleServiceReview, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_service_review_id' })
  vehicle_service_review: VehicleServiceReview
}
