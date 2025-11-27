import { Inject } from "@nestjs/common";
import { LocationEntity } from "src/domain/location/entities/location.entity";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class FindLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    // Obtiene una ubicación por id
    execute(id: string): Promise<LocationEntity | null> {
        return this.repo.findById(id);
    }
}
