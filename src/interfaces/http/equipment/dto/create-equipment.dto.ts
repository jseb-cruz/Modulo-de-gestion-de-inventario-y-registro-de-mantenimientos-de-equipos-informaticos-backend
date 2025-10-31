import { IsString, IsNotEmpty, isEnum, IsDateString, IsOptional, IsEnum} from "class-validator";
import type { EquipmentType, EquipmentStatus } from "../../../../domain/equipment/entities/equipment.entity";

//import type

export class CreateEquipmentDto {
    @IsString()
    @IsNotEmpty()
    assetTag!: string;

    @IsString()
    @IsNotEmpty()
    serialNumber!: string;

    @IsString()
    @IsNotEmpty()
    model!: string;

    @IsEnum(['Laptop', 'Desktop', 'Printer', 'Monitor', 'Server', 'Other'] as
        const)
    type!: EquipmentType;

    @IsEnum(['Available', 'InUse', 'InRepair', 'Retired'] as const)
    status!: EquipmentStatus;
    
    @IsString()
    @IsNotEmpty()
    locationId!: string;
    @IsDateString()
    purchaseDate!: string;
    @IsDateString()
    warrantyEnd!: string;
    @IsOptional()
    metadata?: Record<string, unknown>;
}
