import { Inject } from "@nestjs/common";
import { EquipmentRepository } from
    "../../../domain/equipment/repositories/equipment.repository";
import { EquipmentEntity } from
    "../../../domain/equipment/entities/equipment.entity";
export class FindEquipmentUsecase {
    constructor(
        @Inject(EquipmentRepository) private readonly repo: EquipmentRepository
    ) { }
    execute(id: string): Promise<EquipmentEntity | null> {
        return this.repo.findById(id);
    }
}