import { Body, Controller, Delete, Get, Param, Patch, Post } from
    '@nestjs/common';
import { CreateEquipmentUsecase } from '../../../application/equipment/use-cases/create-equipment.usecase';
import { FindEquipmentUsecase } from '../../../application/equipment/use-cases/find-equipment.usecase';
import { ListEquipmentUsecase } from '../../../application/equipment/use-cases/list-equipment.usecase';
import { RemoveEquipmentUsecase } from '../../../application/equipment/use-cases/remove-equipment.usecase';
import { UpdateEquipmentUsecase } from '../../../application/equipment/use-cases/update-equipment.usecase';
import { EquipmentEntity } from '../../../domain/equipment/entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiBody } from '@nestjs/swagger';

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
    @ApiBody({
        type: CreateEquipmentDto,
        examples: {
            Basico: {
                summary: 'Ejemplo básico',
                description: 'Alta mínima con campos necesarios',
                value: {
                    assetTag: 'ASSET-0001',
                    serialNumber: 'SN-ABC-001',
                    model: 'Dell Latitude 5420',
                    type: 'Laptop',
                    status: 'Available',
                    locationId: 'LOC-01',
                    purchaseDate: '2023-02-10',
                    warrantyEnd: '2026-02-10',
                    metadata: { ram: 16, cpu: 'i7' }
                }
            },
            EnUso: {
                summary: 'Equipo en uso',
                value: {
                    assetTag: 'ASSET-0020',
                    serialNumber: 'SN-XYZ-002',
                    model: 'HP ProDesk 600',
                    type: 'Desktop',
                    status: 'InUse',
                    locationId: 'LAB-02',
                    purchaseDate: '2022-05-01',
                    warrantyEnd: '2025-05-01',
                    metadata: { os: 'Windows 11', owner: 'Sistemas' }
                }
            }
        }
    })

    async create(@Body() dto: CreateEquipmentDto) {
        const entity = EquipmentEntity.create({
            id: crypto.randomUUID(),
            ...dto,
            metadata: dto.metadata ?? {},
        });
        return this.createUC.execute(entity);
    }

    @Patch(':id')
    @ApiBody({
        description: 'Actualización parcial (PATCH). Incluye solo los campos a modificar.',
        type: UpdateEquipmentDto,
        examples: {
            CambiarEstadoYUbicacion: {
                summary: 'Cambio de estado y ubicación',
                description: 'El equipo entra a reparación y se mueve al taller.',
                value: {
                    status: 'InRepair',
                    locationId: 'WORKSHOP-01'
                }
            },
            ActualizarGarantia: {
                summary: 'Extensión de garantía',
                description: 'Se amplía el fin de garantía sin tocar otros campos.',
                value: {
                    warrantyEnd: '2027-04-30'
                }
            },
            CorreccionModeloYMetadata: {
                summary: 'Corrección de modelo y metadatos',
                description: 'Se corrige el modelo y se ajustan metadatos técnicos.',
                value: {
                    model: 'Dell Latitude 5450',
                    metadata: { ram: 32, cpu: 'i7-1365U', ssd: '1TB' }
                }
            }
        }
    })

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
