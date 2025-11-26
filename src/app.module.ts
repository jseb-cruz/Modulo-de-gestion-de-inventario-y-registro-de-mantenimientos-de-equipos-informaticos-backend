import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModule } from './interfaces/http/equipment/equipment.module';
import { MaintenanceModule } from './interfaces/http/maintenance/maintenance.module';
import { MaintenanceMemoryRepositoryService } from './infrastructure/maintenance/repositories/maintenance.memory.repository.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { EquipmentPrismaRepositoryService } from './infrastructure/equipment/repositories/equipment.prisma.repository.service';
import { MaintenancePrismaRepositoryService } from './infrastructure/maintenance/repositories/maintenance.prisma.repository.service';
import { LocationModule } from './interfaces/http/location/location.module';
import { LocationMemoryRepositoryService } from './infrastructure/location/repositories/location.memory.repository.service';
import { LocationPrismaRepositoryService } from './infrastructure/location/repositories/location.prisma.repository.service';
import appConfig from './config/app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig], // variables tipadas
      // Alternativa con Joi (docs oficiales):
      // validationSchema: Joi.object({
      // PORT: Joi.number().default(3000),
      // USE_FAKE_API: Joi.boolean().default(true),
      // DATABASE_URL: Joi.string().optional(),
      // })
    }),
    EquipmentModule,
    MaintenanceModule,
    PrismaModule,
    LocationModule,
  ],
  providers: [MaintenanceMemoryRepositoryService, PrismaService, EquipmentPrismaRepositoryService, MaintenancePrismaRepositoryService, LocationMemoryRepositoryService, LocationPrismaRepositoryService],
})
export class AppModule { }
