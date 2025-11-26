import { LocationEntity } from "../entities/location.entity";


export abstract class LocationRepository {
    abstract findAll(): Promise<LocationEntity[]>;
    abstract findById(id: string): Promise<LocationEntity | null>;
    abstract create(input: LocationEntity): Promise<LocationEntity>;
    abstract update(id: string, patch: Partial<LocationEntity>):
        Promise<LocationEntity>;
    abstract remove(id: string): Promise<void>;
}
