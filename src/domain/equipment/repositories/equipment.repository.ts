import { EquipmentEntity } from "../entities/equipment.entity";
export abstract class EquipmentRepository {
    // Devuelve todos los equipos
    abstract findAll(): Promise<EquipmentEntity[]>;
    // Busca un equipo por id
    abstract findById(id: string): Promise<EquipmentEntity | null>;
    // Crea un nuevo equipo
    abstract create(input: EquipmentEntity): Promise<EquipmentEntity>;
    // Actualiza parcialmente un equipo
    abstract update(id: string, patch: Partial<EquipmentEntity>):
        Promise<EquipmentEntity>;
    // Elimina un equipo
    abstract remove(id: string): Promise<void>;
}
