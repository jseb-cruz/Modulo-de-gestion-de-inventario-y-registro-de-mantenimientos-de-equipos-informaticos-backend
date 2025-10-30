import { EquipmentEntity } from "../entities/equipment.entity";
export abstract class EquipmentRepository {
    abstract findAll(): Promise<EquipmentEntity[]>;
    abstract findById(id: string): Promise<EquipmentEntity | null>;
    abstract create(input: EquipmentEntity): Promise<EquipmentEntity>;
    abstract update(id: string, patch: Partial<EquipmentEntity>):
        Promise<EquipmentEntity>;
    abstract remove(id: string): Promise<void>;
}
