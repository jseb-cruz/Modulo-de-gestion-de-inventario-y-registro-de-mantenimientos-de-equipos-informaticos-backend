export type EquipmentStatus = 'Available' | 'InUse' | 'InRepair' | 'Retired';
export type EquipmentType = 'Laptop' | 'Desktop' | 'Printer' | 'Monitor' |
    'Server' | 'Other';
export class EquipmentEntity {
    constructor(
        public readonly id: string,
        public readonly assetTag: string,
        public readonly serialNumber: string,
        public readonly model: string,
        public readonly type: EquipmentType,
        public readonly status: EquipmentStatus,
        public readonly locationId: string,
        public readonly purchaseDate: Date,
        public readonly warrantyEnd: Date,
        public readonly metadata: Map<string, unknown>,
    ) { }
    static create(input: {
        id: string; assetTag: string; serialNumber: string; model: string;
        type: EquipmentType; status: EquipmentStatus; locationId: string;
        purchaseDate: string | Date; warrantyEnd: string | Date;
        metadata?: Record<string, unknown> | Map<string, unknown>;
    }) {
        if (!input.assetTag?.trim()) {
            throw new Error('assetTag vacío');
        }
        if (!input.serialNumber?.trim()) {
            throw new Error('serialNumber vacío');
        }
        const purchase = input.purchaseDate instanceof Date
            ? input.purchaseDate
            : new Date(input.purchaseDate);
        const warranty = input.warrantyEnd instanceof Date
            ? input.warrantyEnd
            : new Date(input.warrantyEnd);
        const meta = input.metadata instanceof Map
            ? input.metadata
            : new Map(Object.entries(input.metadata ?? {}));
        return new EquipmentEntity(
            input.id, input.assetTag, input.serialNumber, input.model, input.type,
            input.status,
            input.locationId, purchase, warranty, meta,
        );
    }
}
