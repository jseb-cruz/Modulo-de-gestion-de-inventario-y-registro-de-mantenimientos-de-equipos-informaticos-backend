import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMaintenanceUsecase } from '../../../application/maintenance/use-cases/create-maintenance.usecase';
import { FindMaintenanceUsecase } from '../../../application/maintenance/use-cases/find-maintenance.usecase';
import { ListMaintenanceUsecase } from '../../../application/maintenance/use-cases/list-maintenance.usecase';
import { RemoveMaintenanceUsecase } from '../../../application/maintenance/use-cases/remove-maintenance.usecase';
import { UpdateMaintenanceUsecase } from '../../../application/maintenance/use-cases/update-maintenance.usecase';
import { MaintenanceEntity } from '../../../domain/maintenance/entities/maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
    constructor(
        private readonly listUC: ListMaintenanceUsecase,
        private readonly findUC: FindMaintenanceUsecase,
        private readonly createUC: CreateMaintenanceUsecase,
        private readonly updateUC: UpdateMaintenanceUsecase,
        private readonly removeUC: RemoveMaintenanceUsecase,
    ) { }

    @Get()
    findAll() {
        return this.listUC.execute();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.findUC.execute(id);
    }

    @Post()
    @ApiBody({
        type: CreateMaintenanceDto,
        examples: {
            Preventivo: {
                summary: 'Visita preventiva programada',
                value: {
                    equipmentId: 'EQ-001',
                    type: 'Preventive',
                    scheduledAt: '2025-03-14T10:00:00Z',
                    technician: 'John Doe',
                    status: 'Scheduled',
                    notes: 'Verificar filtros y actualizar firmware'
                }
            },
            Correctivo: {
                summary: 'Mantenimiento correctivo terminado',
                value: {
                    equipmentId: 'EQ-025',
                    type: 'Corrective',
                    scheduledAt: '2025-01-20T08:30:00Z',
                    performedAt: '2025-01-21T12:00:00Z',
                    technician: 'Maria Perez',
                    status: 'Done',
                    cost: 180.75,
                    notes: 'Cambio de ventilador y limpieza interna'
                }
            }
        }
    })
    async create(@Body() dto: CreateMaintenanceDto) {
        const entity = MaintenanceEntity.create({
            id: crypto.randomUUID(),
            ...dto
        });
        return this.createUC.execute(entity);
    }

    @Patch(':id')
    @ApiBody({
        description: 'Actualizacion parcial. Solo incluye los campos a modificar.',
        type: UpdateMaintenanceDto,
        examples: {
            Reprogramacion: {
                summary: 'Reprogramar visita y tecnico',
                value: {
                    scheduledAt: '2025-04-02T09:00:00Z',
                    technician: 'Carlos Ruiz',
                    status: 'Scheduled'
                }
            },
            Cierre: {
                summary: 'Cerrar mantenimiento realizado',
                value: {
                    performedAt: '2025-02-18T16:30:00Z',
                    status: 'Done',
                    cost: 95.5,
                    notes: 'Limpieza general y ajuste de calibraciones'
                }
            }
        }
    })
    async update(@Param('id') id: string, @Body() dto: UpdateMaintenanceDto) {
        const patch: Partial<MaintenanceEntity> = {
            ...dto,
            scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
            performedAt: dto.performedAt ? new Date(dto.performedAt) : undefined,
        };
        return this.updateUC.execute(id, patch);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.removeUC.execute(id);
        return { ok: true };
    }
}
