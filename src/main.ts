import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 VALIDACIONES GLOBALES (MUY IMPORTANTE)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos que no están en el DTO
      forbidNonWhitelisted: true, // lanza error si envían campos extra
      transform: true, // transforma tipos automáticamente (string → number)
    }),
  );

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Sistema de Pagos NYU - API Central')
    .setDescription('Documentación para que los otros módulos se conecten a la central de pagos.')
    .setVersion('1.0')
    .addBearerAuth() // candado JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);

  // 📌 Ruta: http://localhost:3000/api
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}
bootstrap();