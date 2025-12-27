import { IsNotEmpty, IsUUID } from "class-validator";

export class DetailDto {
    @IsNotEmpty()
    vehicle_service_review_id: string;
    @IsNotEmpty()
    image1: string;
    @IsNotEmpty()
    image2: string
    @IsNotEmpty()
    mileage: number;
    @IsNotEmpty()
    fuel_level: number;
    @IsUUID()
    created_by: string;
}
