import { Inject } from "@nestjs/common";
import { EquipmentRepository } from
    "../../../domain/equipment/repositories/equipment.repository";
import { EquipmentEntity } from
    "../../../domain/equipment/entities/equipment.entity";
export class CreateEquipmentUsecase {
    constructor(
        @Inject(EquipmentRepository) private readonly repo: EquipmentRepository
    ) { }
    // Persiste un nuevo equipo usando el repositorio configurado
    execute(input: EquipmentEntity) {
        return this.repo.create(input);
    }
}
