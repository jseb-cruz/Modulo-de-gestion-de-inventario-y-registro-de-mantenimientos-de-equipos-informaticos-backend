export type LocationType =
    'Office' |
    'Warehouse' |
    'DataCenter' |
    'Lab' |
    'Remote' |
    'Other';

export type LocationStatus =
    'Active' |
    'Inactive' |
    'UnderMaintenance' |
    'Deprecated';

export class LocationEntity {
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly name: string,
        public readonly type: LocationType,
        public readonly status: LocationStatus,
        public readonly building?: string,
        public readonly floor?: string,
        public readonly room?: string,
        public readonly address?: string,
        public readonly metadata: Map<string, unknown> = new Map(),
    ) { }

    static create(input: {
        id: string;
        code: string;
        name: string;
        type: LocationType;
        status?: LocationStatus;
        building?: string;
        floor?: string;
        room?: string;
        address?: string;
        metadata?: Map<string, unknown> | Record<string, unknown>;
    }): LocationEntity {
        if (!input.id?.trim()) {
            throw new Error('id vacio');
        }
        if (!input.code?.trim()) {
            throw new Error('code vacio');
        }
        if (!input.name?.trim()) {
            throw new Error('name vacio');
        }

        const metadata = input.metadata instanceof Map
            ? input.metadata
            : new Map(Object.entries(input.metadata ?? {}));

        return new LocationEntity(
            input.id,
            input.code,
            input.name,
            input.type,
            input.status ?? 'Active',
            input.building,
            input.floor,
            input.room,
            input.address,
            metadata,
        );
    }

    isActive(): boolean {
        return this.status === 'Active';
    }

    isInactive(): boolean {
        return this.status === 'Inactive';
    }

    isUnderMaintenance(): boolean {
        return this.status === 'UnderMaintenance';
    }

    isDeprecated(): boolean {
        return this.status === 'Deprecated';
    }
}
