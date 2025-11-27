import { Inject } from "@nestjs/common";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class RemoveLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    // Elimina una ubicación por id
    execute(id: string): Promise<void> {
        return this.repo.remove(id);
    }
}
