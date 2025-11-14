import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { MaintenanceEntity } from '../../../domain/maintenance/entities/maintenance.entity';
import { MaintenanceRepository } from '../../../domain/maintenance/repositories/maintenance.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

function toEntity(result: any): MaintenanceEntity {
    return MaintenanceEntity.create({
        id: result.id,
        equipmentId: result.equipmentId,
        type: result.type,
        scheduledAt: result.scheduledAt,
        technician: result.technician,
        status: result.status,
        performedAt: result.performedAt ?? undefined,
        cost: result.cost != null ? Number(result.cost) : undefined,
        notes: typeof result.notes === 'string'
            ? result.notes
            : result.notes != null
                ? JSON.stringify(result.notes)
                : undefined,
    });
}

function toNotesInput(notes?: string): Prisma.InputJsonValue | undefined {
    return notes === undefined ? undefined : notes;
}

@Injectable()
export class MaintenancePrismaRepositoryService implements MaintenanceRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<MaintenanceEntity[]> {
        const rows = await this.prisma.maintenance.findMany();
        return rows.map(toEntity);
    }

    async findById(id: string): Promise<MaintenanceEntity | null> {
        const r = await this.prisma.maintenance.findUnique({ where: { id } });
        return r ? toEntity(r) : null;
    }

    async create(input: MaintenanceEntity): Promise<MaintenanceEntity> {
        const notesValue = toNotesInput(input.notes);
        const r = await this.prisma.maintenance.create({
            data: {
                id: input.id,
                equipmentId: input.equipmentId,
                type: input.type,
                scheduledAt: input.scheduledAt,
                technician: input.technician,
                status: input.status,
                performedAt: input.performedAt,
                cost: input.cost != null ? String(input.cost) : undefined,
                ...(notesValue !== undefined && { notes: notesValue }),
            },
        });
        return toEntity(r);
    }

    async update(id: string, patch: Partial<MaintenanceEntity>): Promise<MaintenanceEntity> {
        const notesValue = toNotesInput(patch.notes);
        const r = await this.prisma.maintenance.update({
            where: { id },
            data: {
                equipmentId: patch.equipmentId,
                type: patch.type,
                scheduledAt: patch.scheduledAt as any,
                technician: patch.technician,
                status: patch.status,
                performedAt: patch.performedAt as any,
                cost: patch.cost !== undefined ? String(patch.cost) : undefined,
                ...(notesValue !== undefined && { notes: notesValue }),
            },
        });
        return toEntity(r);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.maintenance.delete({ where: { id } });
    }
}
