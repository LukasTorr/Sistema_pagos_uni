import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de CORS adaptada
  app.enableCors({
    origin: [
      'http://localhost:4200', // Permite la conexión local del frontend en Angular
      // 'https://url-de-tu-frontend-desplegado.com' // Agrega la URL del frontend cuando se despliegue
    ],
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Sistema de Pagos')
    .setDescription('API del sistema de pagos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 2. Configuración dinámica del puerto (Requerido para Render)
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // 3. Actualización de los mensajes en consola
  console.log(`Servidor inicializado correctamente en el puerto: ${port}`);
  console.log(`Documentación de Swagger disponible en la ruta: /api/docs`);
}

bootstrap();
