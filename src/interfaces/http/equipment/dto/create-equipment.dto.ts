import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from "class-validator";
import type { EquipmentType, EquipmentStatus } from "../../../../domain/equipment/entities/equipment.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEquipmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'ASSET-0001' })
    assetTag!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'SN-ABC-001' })
    serialNumber!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Dell Latitude 5420' })
    model!: string;

    @IsEnum(['Laptop', 'Desktop', 'Printer', 'Monitor', 'Server', 'Other'] as const)
    @ApiProperty({
        enum: ['Laptop', 'Desktop', 'Printer', 'Monitor', 'Server',
            'Other'], example: 'Laptop'
    })
    type!: EquipmentType;

    @IsEnum(['Available', 'InUse', 'InRepair', 'Retired'] as const)
    @ApiProperty({
        enum: ['Available', 'InUse', 'InRepair', 'Retired'], example: 'Available'
    })
    status!: EquipmentStatus;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'LOC-01' })
    locationId!: string;

    @IsDateString()
    @ApiProperty({ type: String, format: 'date', example: '2023-02-10' })
    purchaseDate!: string;

    @IsDateString()
    @ApiProperty({ type: String, format: 'date', example: '2026-02-10' })
    warrantyEnd!: string;

    @IsOptional()
    @ApiProperty({
        type: 'object',
        additionalProperties: true,
        example: { ram: 16, cpu: 'i7' }
    })
    metadata?: Record<string, unknown>;
}
