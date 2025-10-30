import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // /api
  app.setGlobalPrefix('api');
  // /api/v1/*
  app.enableVersioning({ type: VersioningType.URI }); // v{n}
  // Validación global en DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina props extra
    transform: true, // transforma tipos
    forbidNonWhitelisted: true
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

