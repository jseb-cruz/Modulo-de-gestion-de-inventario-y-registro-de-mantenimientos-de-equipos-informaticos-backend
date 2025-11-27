import { LocationEntity } from "../entities/location.entity";


export abstract class LocationRepository {
    // Devuelve todas las ubicaciones
    abstract findAll(): Promise<LocationEntity[]>;
    // Busca una ubicación por id
    abstract findById(id: string): Promise<LocationEntity | null>;
    // Crea una ubicación
    abstract create(input: LocationEntity): Promise<LocationEntity>;
    // Actualiza parcialmente una ubicación
    abstract update(id: string, patch: Partial<LocationEntity>):
        Promise<LocationEntity>;
    // Elimina una ubicación
    abstract remove(id: string): Promise<void>;
}
