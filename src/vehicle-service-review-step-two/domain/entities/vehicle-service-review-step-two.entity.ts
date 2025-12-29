
import { Cargo, SpareTire, TireCondition, TireDamage, TireDepth, TruckToolSet, WheelControlCover } from 'src/shared/enum/vehicle-service-review-step-two/step-two.enum'
import { VehicleServiceReview } from 'src/vehicle-service-review/domain/entities/vehicle-service-review.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('vehicle_service_review_step_two')
export class VehicleServiceReviewStepTwo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  vehicle_service_review_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'enum', enum: SpareTire, nullable: true })
  spare_tire: SpareTire

  @Column({ type: 'enum', enum: WheelControlCover, nullable: true })
  wheel_control_cover: WheelControlCover

  //เฉพาะรถบรรทุก
  @Column({ type: 'enum', enum: Cargo, nullable: true })
  cargo: Cargo

  //เฉพาะรถบรรทุก
  @Column({ type: 'enum', enum: TruckToolSet, nullable: true })
  truck_tool_set: TruckToolSet

  @Column({ type: 'varchar', nullable: true })
  left_front_tire_year: string

  @Column({ type: 'varchar', nullable: true })
  right_front_tire_year: string

  @Column({ type: 'varchar', nullable: true })
  left_back_tire_year: string

  @Column({ type: 'varchar', nullable: true })
  right_back_tire_year: string

  @Column({ type: 'integer', nullable: true })
  left_front_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  right_front_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  left_back_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  right_back_tire_pressure: number

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  left_front_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  right_front_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  left_back_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  right_back_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  left_front_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  right_front_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  left_back_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  right_back_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  left_front_tire_damage: TireDamage

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  right_front_tire_damage: TireDamage

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  left_back_tire_damage: TireDamage

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  right_back_tire_damage: TireDamage

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'boolean', default: true })
  is_active: boolean

  @CreateDateColumn({ type: 'timestamp with time zone',nullable:false})
  created_at: Date

  @Column({ type: 'uuid', nullable: false })
  created_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true})
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  @ManyToOne(() => VehicleServiceReview, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_service_review_id' })
  vehicle_service_review: VehicleServiceReview
}
