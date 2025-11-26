import { Inject } from "@nestjs/common";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class RemoveLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    execute(id: string): Promise<void> {
        return this.repo.remove(id);
    }
}
