import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateEquipmentUsecase } from '../../../application/equipment/use-cases/create-equipment.usecase';
import { FindEquipmentUsecase } from '../../../application/equipment/use-cases/find-equipment.usecase';
import { ListEquipmentUsecase } from '../../../application/equipment/use-cases/list-equipment.usecase';
import { RemoveEquipmentUsecase } from '../../../application/equipment/use-cases/remove-equipment.usecase';
import { UpdateEquipmentUsecase } from '../../../application/equipment/use-cases/update-equipment.usecase';
import { EquipmentRepository } from '../../../domain/equipment/repositories/equipment.repository';
import { EquipmentMemoryRepositoryService } from '../../../infrastructure/equipment/repositories/equipment.memory.repository.service';
import { EquipmentController } from './equipment.controller';
@Module({
  controllers: [EquipmentController],
  providers: [
    ListEquipmentUsecase, FindEquipmentUsecase, CreateEquipmentUsecase,
    UpdateEquipmentUsecase, RemoveEquipmentUsecase,
    EquipmentMemoryRepositoryService,
    {
      provide: EquipmentRepository,
      useFactory: (
        cfg: ConfigService,
        memory: EquipmentMemoryRepositoryService,
        /* prisma: EquipmentPrismaRepositoryService */
      ) => {
        const useFake = cfg.get<boolean>('app.useFakeApi', true);
        return useFake
          ? memory
          : /* prisma */ memory;
      },
      inject: [ConfigService, EquipmentMemoryRepositoryService /*,
EquipmentPrismaRepositoryService */ ],
    },
  ]
})
export class EquipmentModule { }
