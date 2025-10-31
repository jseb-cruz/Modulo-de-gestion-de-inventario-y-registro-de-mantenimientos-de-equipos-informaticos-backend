import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModule } from './interfaces/http/equipment/equipment.module';
import { MaintenanceModule } from './interfaces/http/maintenance/maintenance.module';
import { MaintenanceMemoryRepositoryService } from './infrastructure/maintenance/repositories/maintenance.memory.repository.service';
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
  ],
  providers: [MaintenanceMemoryRepositoryService],
})
export class AppModule { }
