import { TirePressure } from "src/shared/enum/vehicle-service-review-detail/detail.enum";

export class DetailAdditionalDto {
    vehicle_service_review_detail_id: string;
    tire_pressure : TirePressure;
    front_tire_pressure: number;
    back_tire_pressure: number;
    comment: string;
    is_active: boolean;
    success_flag: boolean;
    created_by: string;
    created_at: Date;
    updated_by: string;
    updated_at: Date;
}
