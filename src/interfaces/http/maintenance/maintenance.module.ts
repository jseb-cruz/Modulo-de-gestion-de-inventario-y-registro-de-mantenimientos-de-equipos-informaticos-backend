import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMaintenanceUsecase } from 'src/application/maintenance/use-cases/create-maintenance.usecase';
import { FindMaintenanceUsecase } from 'src/application/maintenance/use-cases/find-maintenance.usecase';
import { ListMaintenanceUsecase } from 'src/application/maintenance/use-cases/list-maintenance.usecase';
import { RemoveMaintenanceUsecase } from 'src/application/maintenance/use-cases/remove-maintenance.usecase';
import { UpdateMaintenanceUsecase } from 'src/application/maintenance/use-cases/update-maintenance.usecase';
import { MaintenanceRepository } from 'src/domain/maintenance/repositories/maintenance.repository';
import { MaintenanceMemoryRepositoryService } from 'src/infrastructure/maintenance/repositories/maintenance.memory.repository.service';
import { MaintenanceController } from './maintenance.controller';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { MaintenancePrismaRepositoryService } from 'src/infrastructure/maintenance/repositories/maintenance.prisma.repository.service';
@Module({
  imports: [PrismaModule],
  controllers: [MaintenanceController],
  providers: [
    ListMaintenanceUsecase, FindMaintenanceUsecase, CreateMaintenanceUsecase,
    UpdateMaintenanceUsecase, RemoveMaintenanceUsecase,
    MaintenanceMemoryRepositoryService,
    MaintenancePrismaRepositoryService,
    {
      provide: MaintenanceRepository,
      useFactory: (
        cfg: ConfigService,
        memory: MaintenanceMemoryRepositoryService,
        prisma: MaintenancePrismaRepositoryService
      ) => {
        const useFake = cfg.get<boolean>('app.useFakeApi', true);
        return useFake
          ? memory
          : prisma;
      },
      inject: [ConfigService, MaintenanceMemoryRepositoryService,
MaintenancePrismaRepositoryService ],
    },
  ]
})
export class MaintenanceModule { }
