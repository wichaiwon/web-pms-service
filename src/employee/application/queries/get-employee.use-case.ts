import { Injectable } from "@nestjs/common";
import type { IEmployeeRepository } from "src/employee/domain/interfaces/employee.repository.interface";

@Injectable()
export class GetEmployeeUseCase {
    constructor(
        private readonly employeeRepository: IEmployeeRepository
    ) {}

    async execute(username: string) {
        return this.employeeRepository.findByUsername(username);
    }
}
