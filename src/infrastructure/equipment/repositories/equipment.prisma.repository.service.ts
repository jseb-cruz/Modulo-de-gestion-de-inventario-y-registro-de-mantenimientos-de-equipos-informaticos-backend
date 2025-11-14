import { Prisma } from "prisma/generated/prisma/client";
import { EquipmentEntity } from "../../../domain/equipment/entities/equipment.entity";
import { EquipmentRepository } from "../../../domain/equipment/repositories/equipment.repository";
import { PrismaService } from "../../database/prisma/prisma.service";
import { Injectable } from '@nestjs/common';

function toEntity(result: any): EquipmentEntity {
    return EquipmentEntity.create({
        id: result.id, assetTag: result.assetTag, serialNumber:
            result.serialNumber, model: result.model,
        type: result.type, status: result.status, locationId: result.locationId,
        purchaseDate: result.purchaseDate, warrantyEnd: result.warrantyEnd,
        metadata: result.metadata ?? {},
    });
}

@Injectable()
export class EquipmentPrismaRepositoryService implements EquipmentRepository {
    constructor(private readonly prisma: PrismaService) { }
    async findAll(): Promise<EquipmentEntity[]> {
        const rows = await this.prisma.equipment.findMany();
        return rows.map(toEntity);
    }
    async findById(id: string): Promise<EquipmentEntity | null> {
        const r = await this.prisma.equipment.findUnique({ where: { id } });
        return r ? toEntity(r) : null;
    }
    async create(input: EquipmentEntity): Promise<EquipmentEntity> {
        const r = await this.prisma.equipment.create({
            data: {
                id: input.id, assetTag: input.assetTag, serialNumber:
                    input.serialNumber,
                model: input.model, type: input.type, status: input.status,
                locationId: input.locationId, purchaseDate: input.purchaseDate,
                warrantyEnd: input.warrantyEnd,
                metadata: Object.fromEntries(input.metadata) as
                    Prisma.JsonObject,
            },
        });
        return toEntity(r);
    }
    async update(id: string, patch: Partial<EquipmentEntity>):
        Promise<EquipmentEntity> {
        const r = await this.prisma.equipment.update({
            where: { id },
            data: {
                assetTag: patch.assetTag, serialNumber: patch.serialNumber, model:
                    patch.model,
                type: patch.type, status: patch.status, locationId:
                    patch.locationId,
                purchaseDate: patch.purchaseDate as any, warrantyEnd:
                    patch.warrantyEnd as any,
                metadata: patch.metadata ? Object.fromEntries(patch.metadata) as
                    Prisma.JsonObject : undefined,
            },
        });
        return toEntity(r);
    }
    async remove(id: string): Promise<void> {
        await this.prisma.equipment.delete({ where: { id } });
    }
}
