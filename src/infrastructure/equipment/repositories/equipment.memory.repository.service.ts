import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from
    '../../../domain/equipment/repositories/equipment.repository';
import { EquipmentEntity } from
    '../../../domain/equipment/entities/equipment.entity';
const seed: EquipmentEntity[] = [
    new EquipmentEntity(
        'e-1',
        'ASSET-0001',
        'SN-ABC-001',
        'Dell Latitude 5420',
        'Laptop',
        'Available',
        'LOC-01',
        new Date('2023-02-10'),
        new Date('2026-02-10'),
        new Map<string, unknown>([['ram', 16], ['cpu', 'i7']])
    ),
    new EquipmentEntity(
        'e-2',
        'ASSET-0002',
        'SN-XYZ-002',
        'HP ProDesk 600',
        'Desktop',
        'InUse',
        'LOC-02',
        new Date('2022-05-01'),
        new Date('2025-05-01'),
        new Map<string, unknown>([['ram', 8], ['cpu', 'i5']])
    ),
];
@Injectable()
export class EquipmentMemoryRepositoryService implements EquipmentRepository {
    private data = [...seed];
    
    // Devuelve todos los equipos en memoria
    async findAll() {
        return this.data;
    }
    // Busca un equipo por id
    async findById(id: string) {
        return this.data.find(e => e.id === id) ?? null;
    }
    // Inserta un nuevo equipo en el arreglo
    async create(input: EquipmentEntity) {
        this.data = [input, ...this.data]; return input;
    }
    // Actualiza un equipo existente fusionando el patch
    async update(id: string, patch: Partial<EquipmentEntity>) {
        const i = this.data.findIndex(e => e.id === id);
        if (i < 0) {
            throw new Error('Not found');
        }
        const current = this.data[i];
        const updated = new EquipmentEntity(
            current.id,
            patch.assetTag ?? current.assetTag,
            patch.serialNumber ?? current.serialNumber,
            patch.model ?? current.model,
            patch.type ?? current.type,
            patch.status ?? current.status,
            patch.locationId ?? current.locationId,
            patch.purchaseDate ?? current.purchaseDate,
            patch.warrantyEnd ?? current.warrantyEnd,
            patch.metadata ?? current.metadata,
        );
        this.data[i] = updated;
        return updated;
    }
    // Elimina un equipo en memoria
    async remove(id: string) {
        this.data = this.data.filter(e => e.id !== id);
    }
}
