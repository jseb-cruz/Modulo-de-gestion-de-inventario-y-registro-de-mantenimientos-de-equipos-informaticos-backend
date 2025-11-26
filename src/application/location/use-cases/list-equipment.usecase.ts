import { Inject } from "@nestjs/common";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class ListLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    execute() {
        return this.repo.findAll();
    }
}
