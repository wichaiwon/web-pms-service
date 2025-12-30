import { VehicleServiceReview } from 'src/vehicle-service-review/domain/entities/vehicle-service-review.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('vehicle_service_review_step_three')
export class VehicleServiceReviewStepThree {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'uuid', nullable: false })
    vehicle_service_review_id: string

    @Column({ type: 'varchar', nullable: true })
    session_id: string

    @Column({ type: 'double precision', nullable: true })
    first_battery_voltage: number

    @Column({ type: 'double precision', nullable: true })
    first_measurement: number

    @Column({ type: 'double precision', nullable: true })
    first_rating: number

    @Column({ type: 'double precision', nullable: true })
    second_battery_voltage: number

    @Column({ type: 'double precision', nullable: true })
    second_measurement: number

    @Column({ type: 'double precision', nullable: true })
    second_rating: number

    @Column({ type: 'boolean', default: false })
    success_flag: boolean

    @Column({ type: 'boolean', default: true })
    is_active: boolean

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
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
}
