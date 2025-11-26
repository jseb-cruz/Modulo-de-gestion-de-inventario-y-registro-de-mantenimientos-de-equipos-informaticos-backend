import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import type { LocationStatus, LocationType } from "../../../../domain/location/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'LOC-01' })
    code!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Main Warehouse' })
    name!: string;

    @IsEnum(['Office', 'Warehouse', 'DataCenter', 'Lab', 'Remote', 'Other'] as const)
    @ApiProperty({
        enum: ['Office', 'Warehouse', 'DataCenter', 'Lab', 'Remote', 'Other'],
        example: 'Office'
    })
    type!: LocationType;

    @IsOptional()
    @IsEnum(['Active', 'Inactive', 'UnderMaintenance', 'Deprecated'] as const)
    @ApiProperty({
        enum: ['Active', 'Inactive', 'UnderMaintenance', 'Deprecated'],
        example: 'Active',
        required: false,
        default: 'Active'
    })
    status: LocationStatus = 'Active';

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Building A', required: false })
    building?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '3', required: false })
    floor?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Room 305', required: false })
    room?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '123 Main St, Springfield', required: false })
    address?: string;

    @IsOptional()
    @ApiProperty({
        type: 'object',
        additionalProperties: true,
        example: { climate: 'HVAC', capacity: 120 }
    })
    metadata?: Record<string, unknown>;
}
