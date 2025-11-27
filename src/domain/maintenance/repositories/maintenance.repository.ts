import { MaintenanceEntity } from "../entities/maintenance.entity";
export abstract class MaintenanceRepository {
    // Lista todos los mantenimientos
    abstract findAll(): Promise<MaintenanceEntity[]>;
    // Busca un mantenimiento por id
    abstract findById(id: string): Promise<MaintenanceEntity | null>;
    // Crea un mantenimiento
    abstract create(input: MaintenanceEntity): Promise<MaintenanceEntity>;
    // Actualiza parcialmente un mantenimiento
    abstract update(id: string, patch: Partial<MaintenanceEntity>):
        Promise<MaintenanceEntity>;
    // Elimina un mantenimiento
    abstract remove(id: string): Promise<void>;
}
