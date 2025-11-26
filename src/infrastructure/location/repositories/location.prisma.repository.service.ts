import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { LocationEntity } from '../../../domain/location/entities/location.entity';
import { LocationRepository } from '../../../domain/location/repositories/location.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

function toEntity(result: any): LocationEntity {
    return LocationEntity.create({
        id: result.id,
        code: result.code,
        name: result.name,
        type: result.type,
        status: result.status,
        building: result.building,
        floor: result.floor,
        room: result.room,
        address: result.address,
        metadata: result.metadata ?? {},
    });
}

@Injectable()
export class LocationPrismaRepositoryService implements LocationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<LocationEntity[]> {
        const rows = await this.prisma.location.findMany();
        return rows.map(toEntity);
    }

    async findById(id: string): Promise<LocationEntity | null> {
        const row = await this.prisma.location.findUnique({ where: { id } });
        return row ? toEntity(row) : null;
    }

    async create(input: LocationEntity): Promise<LocationEntity> {
        const row = await this.prisma.location.create({
            data: {
                id: input.id,
                code: input.code,
                name: input.name,
                type: input.type,
                status: input.status,
                building: input.building,
                floor: input.floor,
                room: input.room,
                address: input.address,
                metadata: Object.fromEntries(input.metadata) as Prisma.JsonObject,
            },
        });
        return toEntity(row);
    }

    async update(id: string, patch: Partial<LocationEntity>): Promise<LocationEntity> {
        const row = await this.prisma.location.update({
            where: { id },
            data: {
                code: patch.code,
                name: patch.name,
                type: patch.type,
                status: patch.status,
                building: patch.building,
                floor: patch.floor,
                room: patch.room,
                address: patch.address,
                metadata: patch.metadata
                    ? Object.fromEntries(patch.metadata) as Prisma.JsonObject
                    : undefined,
            },
        });
        return toEntity(row);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.location.delete({ where: { id } });
    }
}
