import { webcrypto } from 'crypto';
(globalThis as any).crypto = webcrypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para que los otros equipos puedan consumir tu API
  app.enableCors();

  // Versionado de API
  app.enableVersioning({ type: VersioningType.URI });

  // Validación global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Pagos NYU')
    .setDescription('API central de pagos y tesorería - Universidad NYU')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor corriendo en http://localhost:3000`);
  console.log(`📄 Swagger en http://localhost:3000/api/docs`);
}
bootstrap();