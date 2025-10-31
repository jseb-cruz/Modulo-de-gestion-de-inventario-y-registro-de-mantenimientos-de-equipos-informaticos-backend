import { Injectable } from '@nestjs/common';
import { MaintenanceEntity } from '../../../domain/maintenance/entities/maintenance.entity';
import { MaintenanceRepository } from '../../../domain/maintenance/repositories/maintenance.repository';

const seed: MaintenanceEntity[] = [
    new MaintenanceEntity(
        '1',
        'EQ-001',
        'Preventive',
        new Date('2024-07-01T10:00:00Z'),
        'John Doe',
        'Scheduled',
        undefined,
        undefined,
        'Initial preventive maintenance scheduled.',
    ),
    new MaintenanceEntity(
        '2',
        'EQ-002',
        'Corrective',
        new Date('2024-06-15T14:00:00Z'),
        'Jane Smith',
        'InProgress',
        undefined,
        undefined,
        'Corrective maintenance in progress due to unexpected failure.',
    ),
];

@Injectable()
export class MaintenanceMemoryRepositoryService implements MaintenanceRepository {
    private data = [...seed];

    async findAll() {
        return this.data;
    }

    async findById(id: string) {
        return this.data.find(m => m.id === id) ?? null;
    }

    async create(input: MaintenanceEntity) {
        this.data = [input, ...this.data];return input;
    }

    async update(id: string, patch: Partial<MaintenanceEntity>) {
        const i = this.data.findIndex(m => m.id === id);
        if (i < 0) {
            throw new Error('Not found');
        }
        const current = this.data[i];
        const updated = new MaintenanceEntity(
            current.id,
            patch.equipmentId ?? current.equipmentId,
            patch.type ?? current.type,
            patch.scheduledAt ?? current.scheduledAt,
            patch.technician ?? current.technician,
            patch.status ?? current.status,
            patch.performedAt ?? current.performedAt,
            patch.cost ?? current.cost,
            patch.notes ?? current.notes,
        );
        this.data[i] = updated;
        return updated;
    }

    async remove(id: string) {
        this.data = this.data.filter(m => m.id === id);
    }
}
