import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  iniciarSesion(@Body() body: any) {
    // En un caso real, usaríamos un LoginDto aquí para validar
    return this.authService.login(body.usuario, body.contrasena);
  }
}