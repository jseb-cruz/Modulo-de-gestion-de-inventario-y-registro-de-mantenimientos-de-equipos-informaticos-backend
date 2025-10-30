import { Body, Controller, Delete, Get, Param, Patch, Post } from
    '@nestjs/common';
import { CreateEquipmentUsecase } from '../../../application/equipment/use-cases/create-equipment.usecase';
import { FindEquipmentUsecase } from '../../../application/equipment/use-cases/find-equipment.usecase';
import { ListEquipmentUsecase } from '../../../application/equipment/use-cases/list-equipment.usecase';
import { RemoveEquipmentUsecase } from '../../../application/equipment/use-cases/remove-equipment.usecase';
import { UpdateEquipmentUsecase } from '../../../application/equipment/use-cases/update-equipment.usecase';
import { EquipmentEntity } from
    '../../../domain/equipment/entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
@Controller({ path: "equipment", version: '1' }) // /api/v1/equipment
export class EquipmentController {
    constructor(
        private readonly listUC: ListEquipmentUsecase,
        private readonly findUC: FindEquipmentUsecase,
        private readonly createUC: CreateEquipmentUsecase,
        private readonly updateUC: UpdateEquipmentUsecase,
        private readonly removeUC: RemoveEquipmentUsecase,
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
    async create(@Body() dto: CreateEquipmentDto) {
        const entity = EquipmentEntity.create({
            id: crypto.randomUUID(),
            ...dto,
            purchaseDate: dto.purchaseDate,
            warrantyEnd: dto.warrantyEnd,
            metadata: dto.metadata ?? {},
        });
        return this.createUC.execute(entity);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
        const patch: Partial<EquipmentEntity> = {
            ...dto,
            purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) :
                undefined,
            warrantyEnd: dto.warrantyEnd ? new Date(dto.warrantyEnd) :
                undefined,
            metadata: new Map(Object.entries(dto.metadata ?? {}))
        };
        return this.updateUC.execute(id, patch);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.removeUC.execute(id);
        return { ok: true };
    }
}
