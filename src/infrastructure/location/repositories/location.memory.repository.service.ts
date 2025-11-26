import { Injectable } from '@nestjs/common';
import { LocationEntity } from '../../../domain/location/entities/location.entity';
import { LocationRepository } from '../../../domain/location/repositories/location.repository';

const seed: LocationEntity[] = [
    new LocationEntity(
        'loc-1',
        'LOC-01',
        'Main Warehouse',
        'Warehouse',
        'Active',
        'Building A',
        '1',
        'Storage 101',
        '123 Main St',
        new Map<string, unknown>([['climate', 'HVAC'], ['capacity', 120]])
    ),
    new LocationEntity(
        'loc-2',
        'DC-01',
        'Primary Data Center',
        'DataCenter',
        'Active',
        'Building B',
        'B2',
        'Room 201',
        '456 Industrial Rd',
        new Map<string, unknown>([['redundancy', 'N+1'], ['areaSqm', 250]])
    ),
];

@Injectable()
export class LocationMemoryRepositoryService implements LocationRepository {
    private data = [...seed];

    async findAll() {
        return this.data;
    }

    async findById(id: string) {
        return this.data.find(l => l.id === id) ?? null;
    }

    async create(input: LocationEntity) {
        this.data = [input, ...this.data];
        return input;
    }

    async update(id: string, patch: Partial<LocationEntity>) {
        const index = this.data.findIndex(l => l.id === id);
        if (index < 0) {
            throw new Error('Not found');
        }
        const current = this.data[index];
        const updated = new LocationEntity(
            current.id,
            patch.code ?? current.code,
            patch.name ?? current.name,
            patch.type ?? current.type,
            patch.status ?? current.status,
            patch.building ?? current.building,
            patch.floor ?? current.floor,
            patch.room ?? current.room,
            patch.address ?? current.address,
            patch.metadata ?? current.metadata,
        );
        this.data[index] = updated;
        return updated;
    }

    async remove(id: string) {
        this.data = this.data.filter(l => l.id !== id);
    }
}
