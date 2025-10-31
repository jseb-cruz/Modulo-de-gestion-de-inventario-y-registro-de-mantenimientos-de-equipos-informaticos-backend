export type MaintenanceStatus =
    'Active' |
    'Inactive' |
    'InProgress' |
    'Done' |
    'Scheduled';

export type MaintenanceType =
    'Inspection' |
    'Preventive' |
    'Corrective' |
    'Predictive' |
    'Proactive' |
    'Reactive' |
    'Scheduled' |
    'Automated';

export class MaintenanceEntity {
    constructor(
        public readonly id: string,
        public readonly equipmentId: string,
        public readonly type: MaintenanceType,
        public readonly scheduledAt: Date,
        public readonly technician: string,
        public readonly status: MaintenanceStatus,
        public readonly performedAt?: Date,
        public readonly cost?: number,
        public readonly notes?: string,
    ) { }

    static create(input: {
        id: string;
        equipmentId: string;
        type: MaintenanceType;
        scheduledAt: string | Date;
        technician: string;
        status: MaintenanceStatus;
        performedAt?: string | Date;
        cost?: number;
        notes?: string;
    }): MaintenanceEntity {
        if (!input.id?.trim()) {
            throw new Error('id vacio');
        }
        if (!input.equipmentId?.trim()) {
            throw new Error('equipmentId vacio');
        }
        if (!input.technician?.trim()) {
            throw new Error('technician vacio');
        }

        const scheduledAt = input.scheduledAt instanceof Date
            ? input.scheduledAt
            : new Date(input.scheduledAt);
        if (Number.isNaN(scheduledAt.getTime())) {
            throw new Error('scheduledAt invalido');
        }

        let performedAt: Date | undefined;
        if (input.performedAt instanceof Date) {
            performedAt = input.performedAt;
        } else if (input.performedAt) {
            const parsed = new Date(input.performedAt);
            if (Number.isNaN(parsed.getTime())) {
                throw new Error('performedAt invalido');
            }
            performedAt = parsed;
        }

        return new MaintenanceEntity(
            input.id,
            input.equipmentId,
            input.type,
            scheduledAt,
            input.technician,
            input.status ?? 'Scheduled',
            performedAt,
            input.cost,
            input.notes,
        );
    }

    isCompleted(): boolean {
        return this.status === 'Done';
    }
}



