import { Inject } from "@nestjs/common";
import { LocationRepository } from "src/domain/location/repositories/location.repository";

export class ListLocationUsecase {
    constructor(
        @Inject(LocationRepository) private readonly repo: LocationRepository
    ) { }
    // Lista todas las ubicaciones existentes
    execute() {
        return this.repo.findAll();
    }
}
