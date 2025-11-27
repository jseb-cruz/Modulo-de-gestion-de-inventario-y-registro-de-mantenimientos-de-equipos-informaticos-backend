import { Inject } from "@nestjs/common";
import { EquipmentRepository } from
    "../../../domain/equipment/repositories/equipment.repository";
import { EquipmentEntity } from
    "../../../domain/equipment/entities/equipment.entity";
export class RemoveEquipmentUsecase {
    constructor(
        @Inject(EquipmentRepository) private readonly repo: EquipmentRepository
    ) { }
    // Elimina un equipo por su identificador
    execute(id: string): Promise<void> {
        return this.repo.remove(id);
    }
}
