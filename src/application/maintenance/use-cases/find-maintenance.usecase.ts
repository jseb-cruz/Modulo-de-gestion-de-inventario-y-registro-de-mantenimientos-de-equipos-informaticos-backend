import { Inject } from "@nestjs/common";
import { MaintenanceRepository } from
    "../../../domain/maintenance/repositories/maintenance.repository";
import { MaintenanceEntity } from
    "../../../domain/maintenance/entities/maintenance.entity";
export class FindMaintenanceUsecase {
    constructor(
        @Inject(MaintenanceRepository) private readonly repo: MaintenanceRepository
    ) { }
    execute(id: string): Promise<MaintenanceEntity | null> {
        return this.repo.findById(id);
    }
}