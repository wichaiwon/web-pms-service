
export class VehicleServiceReviewDto {
    id: string;
    success_flag: boolean;
    in_process_flag: boolean;
    vehicle_registration: string;
    vehicle_registration_province: string;
    model_number: string;
    model_name: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_contact: string;
    date_booked: string;
    time_booked: string;
    branch_booked: string;
    responsible: string[];
    car_brand: string;
    car_type: string;
    status_report: string;
    status_repair_order: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
}
