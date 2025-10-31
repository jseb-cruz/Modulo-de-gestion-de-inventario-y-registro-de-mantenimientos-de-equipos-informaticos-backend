import { Inject } from "@nestjs/common";
import { MaintenanceRepository } from
    "../../../domain/maintenance/repositories/maintenance.repository";
import { MaintenanceEntity } from
    "../../../domain/maintenance/entities/maintenance.entity";
export class CreateMaintenanceUsecase {
    constructor(
        @Inject(MaintenanceRepository) private readonly repo: MaintenanceRepository
    ) { }
    execute(input: MaintenanceEntity) {
        return this.repo.create(input);
    }
}
