import { Inject } from "@nestjs/common";
import { LocationEntity } from "src/domain/location/entities/location.entity";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class UpdateLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    // Aplica un patch parcial sobre una ubicación
    execute(id: string, patch: Partial<LocationEntity>) {
        return this.repo.update(id, patch);
    }
}
