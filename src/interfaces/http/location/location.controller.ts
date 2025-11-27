import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateLocationUsecase } from '../../../application/location/use-cases/create-location.usecase';
import { FindLocationUsecase } from '../../../application/location/use-cases/find-location.usecase';
import { ListLocationUsecase } from '../../../application/location/use-cases/list-equipment.usecase';
import { RemoveLocationUsecase } from '../../../application/location/use-cases/remove-location.usecase';
import { UpdateLocationUsecase } from '../../../application/location/use-cases/update-location.usecase';
import { LocationEntity } from '../../../domain/location/entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller({ path: "location", version: '1' })
export class LocationController {
    constructor(
        private readonly listUC: ListLocationUsecase,
        private readonly findUC: FindLocationUsecase,
        private readonly createUC: CreateLocationUsecase,
        private readonly updateUC: UpdateLocationUsecase,
        private readonly removeUC: RemoveLocationUsecase,
    ) { }

    @Get()
    // Lista todas las ubicaciones registradas
    findAll() {
        return this.listUC.execute();
    }

    @Get(':id')
    // Obtiene una ubicación por id
    findById(@Param('id') id: string) {
        return this.findUC.execute(id);
    }

    @Post()
    @ApiBody({
        type: CreateLocationDto,
        examples: {
            Basico: {
                summary: 'Ubicacion principal',
                value: {
                    code: 'LOC-01',
                    name: 'Main Warehouse',
                    type: 'Warehouse',
                    status: 'Active',
                    building: 'A',
                    floor: '1',
                    room: 'Storage 101',
                    address: '123 Main St',
                    metadata: { climate: 'HVAC', capacity: 120 }
                }
            },
            Remoto: {
                summary: 'Sitio remoto',
                value: {
                    code: 'REM-05',
                    name: 'Remote Site 5',
                    type: 'Remote',
                    status: 'Inactive',
                    metadata: { region: 'North', timezone: 'GMT-5' }
                }
            }
        }
    })
    // Crea una nueva ubicación con metadatos opcionales
    async create(@Body() dto: CreateLocationDto) {
        const entity = LocationEntity.create({
            id: crypto.randomUUID(),
            ...dto,
            metadata: dto.metadata ?? {},
        });
        return this.createUC.execute(entity);
    }

    @Patch(':id')
    @ApiBody({
        description: 'Actualizacion parcial de una ubicacion. Incluye solo los campos a modificar.',
        type: UpdateLocationDto,
        examples: {
            CambiarEstado: {
                summary: 'Cambio de estado',
                value: {
                    status: 'UnderMaintenance'
                }
            },
            AjustarDetalles: {
                summary: 'Actualizar nombre y metadatos',
                value: {
                    name: 'Data Center Norte',
                    metadata: { capacity: 80, contact: 'ops-team' }
                }
            }
        }
    })
    // Actualiza parcialmente los datos de una ubicación
    async update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
        const patch: Partial<LocationEntity> = {
            ...dto,
            metadata: dto.metadata ? new Map(Object.entries(dto.metadata)) : undefined,
        };
        return this.updateUC.execute(id, patch);
    }

    @Delete(':id')
    // Elimina una ubicación por id
    async remove(@Param('id') id: string) {
        await this.removeUC.execute(id);
        return { ok: true };
    }
}
