// src/services/transacciones.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CrearTransaccionDto } from '../dtos/crear-transaccion.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransaccionesService {
  constructor(private readonly jwtService: JwtService) {}

  // Arreglo temporal (Simulando BD)
  private transacciones = [];

  // 1. Generar el Token Firmado (Para el Handshake inicial)
  generarTokenFirma(dto: CrearTransaccionDto) {
    const payload = {
      monto: dto.monto,
      sistema: dto.sistema_origen
    };
    // Firma el token con la configuración del JwtModule (expiresIn: '5m')
    return this.jwtService.sign(payload);
  }

  // 2. Crear la transacción con Validación Cruzada (El "Doble Candado")
  crearSegura(dto: CrearTransaccionDto, token: string) {
    try {
      // Desencriptamos el token para ver qué hay dentro
      const datosToken = this.jwtService.verify(token);

      // COMPARACIÓN: ¿Lo que mandó el front en bruto es igual a lo que dice el token?
      if (dto.monto !== datosToken.monto || dto.sistema_origen !== datosToken.sistema) {
        throw new BadRequestException('¡Alerta de Seguridad! Los datos no coinciden con la firma.');
      }

      // Si pasa la validación, guardamos
      const nuevaTransaccion = {
        id_transaccion: uuidv4(), // Ahora usamos UUID profesional
        ...dto,
        estado: 'PENDIENTE',
        fecha: new Date(),
        usado: false // Flag para evitar que se use el mismo token dos veces
      };

      this.transacciones.push(nuevaTransaccion);
      console.log('Nueva transacción segura creada:', nuevaTransaccion.id_transaccion);
      
      return nuevaTransaccion;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new UnauthorizedException('Token inválido, expirado o manipulado');
    }
  }

  // Los métodos que ya tenías, mejorados:
  obtenerPorId(id: string) {
    return this.transacciones.find(t => t.id_transaccion === id);
  }

  actualizarEstado(id: string, nuevoEstado: 'PAGADO' | 'CANCELADO') {
    const index = this.transacciones.findIndex(t => t.id_transaccion === id);
    if (index !== -1) {
      this.transacciones[index].estado = nuevoEstado;
      this.transacciones[index].usado = true; // Marcamos como finalizada
      return this.transacciones[index];
    }
    return null;
  }
}