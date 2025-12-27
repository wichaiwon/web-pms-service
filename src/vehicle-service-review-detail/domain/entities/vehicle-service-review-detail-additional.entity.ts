import { AdditionalService, TirePressure } from 'src/shared/enum/vehicle-service-review-detail/detail.enum'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { VehicleServiceReviewDetail } from './vehicle-service-review-detail.entity'

@Entity('vehicle_service_review_detail_additional')
export class VehicleServiceReviewDetailAdditional {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'uuid', nullable: false })
    vehicle_service_review_detail_id: string

    @Column({ type: 'varchar', nullable: true })
    session_id: string

    @Column({ type: 'enum', enum: TirePressure, nullable: true })
    tire_pressure: TirePressure

    @Column({ type: 'enum', enum: AdditionalService, array: true, nullable: true })
    additional_service: AdditionalService[]

    @Column({ type: 'integer', nullable: true })
    front_tire_pressure: number

    @Column({ type: 'integer', nullable: true })
    back_tire_pressure: number

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

    // Relations
    @ManyToOne(() => VehicleServiceReviewDetail, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicle_service_review_detail_id' })
    vehicle_service_review_detail: VehicleServiceReviewDetail
}
