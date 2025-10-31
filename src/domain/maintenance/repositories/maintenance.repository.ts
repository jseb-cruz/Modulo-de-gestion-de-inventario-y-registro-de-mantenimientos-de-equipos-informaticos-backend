import { MaintenanceEntity } from "../entities/maintenance.entity";
export abstract class MaintenanceRepository {
 abstract findAll (): Promise<MaintenanceEntity[]>;
 abstract findById ( id: string ): Promise<MaintenanceEntity | null>;
 abstract create ( input: MaintenanceEntity ): Promise<MaintenanceEntity>;
 abstract update ( id: string, patch: Partial<MaintenanceEntity> ):
Promise<MaintenanceEntity>;
 abstract remove ( id: string ): Promise<void>;
}
