import { IsString, IsNotEmpty, IsDateString, IsOptional, IsIn, IsNumber, } from "class-validator";
import { Type } from "class-transformer";
import type { MaintenanceStatus, MaintenanceType, } from "../../../../domain/maintenance/entities/maintenance.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
    @ApiProperty({ example: 'EQ-001' })
    equipmentId!: string;

    @IsIn(MAINTENANCE_TYPES)
    @ApiProperty({ enum: MAINTENANCE_TYPES, example: 'Preventive' })
    type!: MaintenanceType;

    @IsDateString()
    @ApiProperty({ type: String, format: 'date-time', example: '2025-03-14T08:30:00Z' })
    scheduledAt!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe' })
    technician!: string;

    @IsIn(MAINTENANCE_STATUS)
    @ApiProperty({ enum: MAINTENANCE_STATUS, example: 'Scheduled' })
    status: MaintenanceStatus;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ type: String, format: 'date-time', example: '2025-03-15T10:00:00Z' })
    performedAt?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @ApiPropertyOptional({ type: Number, example: 125.50 })
    cost?: number;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Replaced filter and updated firmware' })
    notes?: string;
}
