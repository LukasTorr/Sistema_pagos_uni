// src/controllers/transacciones.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Headers, UnauthorizedException } from '@nestjs/common';
import { CrearTransaccionDto } from '../dtos/crear-transaccion.dto';
import { TransaccionesService } from '../services/transacciones.service';

@Controller('transacciones')
export class TransaccionesController {
  
  constructor(private readonly transaccionesService: TransaccionesService) {}

  // 1. Endpoint para obtener la firma (El "Handshake")
  // Solo la tienda con la API KEY puede entrar aquí
  @Post('firmar')
  solicitarFirma(
    @Body() datos: CrearTransaccionDto,
    @Headers('x-api-key') apiKey: string
  ) {
    const LLAVE_SISTEMA = 'UTA-SECRET-KEY-2026'; // Esta debe coincidir con Angular

    if (apiKey !== LLAVE_SISTEMA) {
      throw new UnauthorizedException('Sistema no autorizado para firmar pagos');
    }

    const token = this.transaccionesService.generarTokenFirma(datos);
    return { token_encriptado: token };
  }

  // 2. Endpoint para inicializar con el "Doble Candado"
  // Aquí recibimos el JSON que el profe pidió: Datos Brutos + Token
  @Post('inicializar')
  inicializarPago(@Body() body: { datos: CrearTransaccionDto, token: string }) {
    // Usamos el nuevo método "crearSegura" que hicimos en el servicio
    const transaccion = this.transaccionesService.crearSegura(body.datos, body.token);
    
    return {
      mensaje: 'Transacción iniciada de forma segura',
      transaccion 
    };
  }

  @Get(':id')
  obtenerTransaccion(@Param('id') id: string) {
    return this.transaccionesService.obtenerPorId(id);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Param('id') id: string, 
    @Body('nuevoEstado') nuevoEstado: 'PAGADO' | 'CANCELADO'
  ) {
    return this.transaccionesService.actualizarEstado(id, nuevoEstado);
  }
}