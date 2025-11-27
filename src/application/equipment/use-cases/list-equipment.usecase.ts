import { Inject } from "@nestjs/common";
import { EquipmentRepository } from
    "../../../domain/equipment/repositories/equipment.repository";
export class ListEquipmentUsecase {
    constructor(
        @Inject(EquipmentRepository) private readonly repo: EquipmentRepository
    ) { }
    // Retorna todos los equipos disponibles
    execute() {
        return this.repo.findAll();
    }
}
