import { Inject } from "@nestjs/common";
import { MaintenanceRepository } from
    "../../../domain/maintenance/repositories/maintenance.repository";
import { MaintenanceEntity } from
    "../../../domain/maintenance/entities/maintenance.entity";
export class UpdateMaintenanceUsecase {
    constructor(
        @Inject(MaintenanceRepository) private readonly repo: MaintenanceRepository
    ) { }
    execute(id: string, patch: Partial<MaintenanceEntity>) {
        return this.repo.update(id, patch);
    }
}

