import { Inject } from "@nestjs/common";
import { MaintenanceRepository } from "../../../domain/maintenance/repositories/maintenance.repository";

export class RemoveMaintenanceUsecase {
    constructor(
        @Inject(MaintenanceRepository) private readonly repo: MaintenanceRepository
    ) { }
    execute(id: string): Promise<void> {
        return this.repo.remove(id);
    }
}
