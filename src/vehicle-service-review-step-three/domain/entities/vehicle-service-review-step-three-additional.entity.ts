import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { VehicleServiceReviewStepThree } from './vehicle-service-review-step-three.entity'

@Entity('vehicle_service_review_step_three_additional')
export class VehicleServiceReviewStepThreeAdditional {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ type: 'uuid', nullable: false })
    vehicle_service_review_step_three_id: string

    @Column({ type: 'varchar', nullable: true })
    session_id: string

    @Column({ type: 'varchar', array: true, nullable: true })
    additional_image: string[]

    @Column({ type: 'varchar', nullable: true })
    comment: string

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

    @ManyToOne(() => VehicleServiceReviewStepThree, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicle_service_review_step_three_id' })
    vehicleServiceReviewStepThree: VehicleServiceReviewStepThree
}
