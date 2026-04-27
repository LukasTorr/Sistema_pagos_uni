// src/modules/controllers.module.ts
import { Module } from '@nestjs/common';
import { TransaccionesController } from '../controllers/transacciones.controller';
import { TransaccionesService } from '../services/transacciones.service'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Tienes que registrarlo aquí también para que el Service lo pueda usar
    JwtModule.register({
      secret: 'UTA-SECRET-KEY-2026',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [TransaccionesController],
  providers: [TransaccionesService], 
})
export class ControllersModule {}