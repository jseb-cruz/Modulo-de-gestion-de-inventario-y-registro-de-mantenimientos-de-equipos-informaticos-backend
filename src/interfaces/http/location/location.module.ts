import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateLocationUsecase } from '../../../application/location/use-cases/create-location.usecase';
import { FindLocationUsecase } from '../../../application/location/use-cases/find-location.usecase';
import { ListLocationUsecase } from '../../../application/location/use-cases/list-equipment.usecase';
import { RemoveLocationUsecase } from '../../../application/location/use-cases/remove-location.usecase';
import { UpdateLocationUsecase } from '../../../application/location/use-cases/update-location.usecase';
import { LocationRepository } from '../../../domain/location/repositories/location.repository';
import { LocationMemoryRepositoryService } from '../../../infrastructure/location/repositories/location.memory.repository.service';
import { LocationController } from './location.controller';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { LocationPrismaRepositoryService } from 'src/infrastructure/location/repositories/location.prisma.repository.service';

@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [
    ListLocationUsecase,
    FindLocationUsecase,
    CreateLocationUsecase,
    UpdateLocationUsecase,
    RemoveLocationUsecase,
    LocationMemoryRepositoryService,
    LocationPrismaRepositoryService,
    {
      provide: LocationRepository,
      useFactory: (
        cfg: ConfigService,
        memory: LocationMemoryRepositoryService,
        prisma: LocationPrismaRepositoryService
      ) => {
        const useFake = cfg.get<boolean>('app.useFakeApi', true);
        return useFake ? memory : prisma;
      },
      inject: [ConfigService, LocationMemoryRepositoryService, LocationPrismaRepositoryService],
    },
  ],
})
export class LocationModule {}
