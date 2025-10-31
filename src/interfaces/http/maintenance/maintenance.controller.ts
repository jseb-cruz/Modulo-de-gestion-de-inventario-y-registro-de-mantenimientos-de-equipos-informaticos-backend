import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMaintenanceUsecase } from '../../../application/maintenance/use-cases/create-maintenance.usecase';
import { FindMaintenanceUsecase } from '../../../application/maintenance/use-cases/find-maintenance.usecase';
import { ListMaintenanceUsecase } from '../../../application/maintenance/use-cases/list-maintenance.usecase';
import { RemoveMaintenanceUsecase } from '../../../application/maintenance/use-cases/remove-maintenance.usecase';
import { UpdateMaintenanceUsecase } from '../../../application/maintenance/use-cases/update-maintenance.usecase';
import { MaintenanceEntity } from '../../../domain/maintenance/entities/maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

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
    async create(@Body() dto: CreateMaintenanceDto) {
        const entity = MaintenanceEntity.create({
            id: crypto.randomUUID(),
            ...dto
        });
        return this.createUC.execute(entity);
    }

    @Patch(':id')
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
