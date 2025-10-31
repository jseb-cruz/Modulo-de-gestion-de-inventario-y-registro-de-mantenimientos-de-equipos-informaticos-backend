import { IsString, IsNotEmpty, IsDateString, IsOptional, IsIn, IsNumber, } from "class-validator";
import { Type } from "class-transformer";
import type { MaintenanceStatus, MaintenanceType, } from "../../../../domain/maintenance/entities/maintenance.entity";

const MAINTENANCE_TYPES: MaintenanceType[] = [
    'Inspection',
    'Preventive',
    'Corrective',
    'Predictive',
    'Proactive',
    'Reactive',
    'Scheduled',
    'Automated',
];

const MAINTENANCE_STATUS: MaintenanceStatus[] = [
    'Active',
    'Inactive',
    'InProgress',
    'Done',
    'Scheduled',
];

export class CreateMaintenanceDto {
    @IsString()
    @IsNotEmpty()
    equipmentId!: string;

    @IsIn(MAINTENANCE_TYPES)
    type!: MaintenanceType;

    @IsDateString()
    scheduledAt!: string;

    @IsString()
    @IsNotEmpty()
    technician!: string;

    @IsIn(MAINTENANCE_STATUS)
    status: MaintenanceStatus;

    @IsOptional()
    @IsDateString()
    performedAt?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    cost?: number;

    @IsOptional()
    @IsString()
    notes?: string;
}
