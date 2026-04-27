import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ControllersModule,JwtModule.register({
      secret: 'LLAVE_SECRETA_UTA_2026', 
      signOptions: { expiresIn: '5m' }, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}