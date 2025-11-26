import { Inject } from "@nestjs/common";
import { LocationEntity } from "src/domain/location/entities/location.entity";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class CreateLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    execute(input: LocationEntity) {
        return this.repo.create(input);
    }
}
