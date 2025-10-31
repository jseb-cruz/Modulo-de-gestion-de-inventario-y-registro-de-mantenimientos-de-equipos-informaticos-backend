import { Inject } from "@nestjs/common";
import { MaintenanceRepository } from
    "../../../domain/maintenance/repositories/maintenance.repository";
import { MaintenanceEntity } from
    "../../../domain/maintenance/entities/maintenance.entity";
export class RemoveMaintenanceUsecase {
    constructor(
        @Inject(MaintenanceRepository) private readonly repo: MaintenanceRepository
    ) { }
    execute(id: string): Promise<void> {
        return this.repo.remove(id);
    }
}
