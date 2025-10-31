import { Inject } from "@nestjs/common";
import { MaintenanceRepository } from
    "../../../domain/maintenance/repositories/maintenance.repository";
export class ListMaintenanceUsecase {
    constructor(
        @Inject(MaintenanceRepository) private readonly repo: MaintenanceRepository
    ) { }
    execute() {
        return this.repo.findAll();
    }
}
