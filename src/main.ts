import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './interfaces/http/common/http-exception.filter';
import { TransformInterceptor } from './interfaces/http/common/transform.interceptor';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Tech Inventory API')
    .setDescription('API v1 para Equipment & Maintenance')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('docs', app as any, doc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

