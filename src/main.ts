import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Sistema de Pagos NYU - API Central')
    .setDescription('Documentación para que los otros módulos se conecten a la central de pagos.')
    .setVersion('1.0')
    .addBearerAuth() // Esto crea el botón del "Candadito" para poner el Token
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  // La documentación estará disponible en la ruta localhost:3000/api
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}
bootstrap();