import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Injectable()
export class PaymentsService {
  // Inyectamos la conexión a la base de datos real
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async crearOrden(dto: CreateOrderDto) {
    // Generamos un código único para la regla de Idempotencia
    const transactionKey = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Preparamos los datos para MySQL
    const nuevaOrden = this.paymentRepository.create({
      idAlumno: dto.idAlumno,
      servicio: dto.servicio,
      monto: dto.monto,
      estado: 'PENDIENTE',
      transactionKey: transactionKey,
    });

    // Guardamos en la base de datos
    const ordenGuardada = await this.paymentRepository.save(nuevaOrden);
    return { mensaje: 'Orden creada exitosamente', orden: ordenGuardada };
  }

  async procesarPago(id: number, dto: ProcessPaymentDto) {
    // 1. Buscamos la orden en MySQL
    const orden = await this.paymentRepository.findOneBy({ id });
    if (!orden) throw new BadRequestException('Orden no encontrada');

    // 2. Regla de negocio: Evitar cobros dobles
    if (orden.estado === 'PAGADA') {
      return { mensaje: 'Advertencia: Esta orden ya fue pagada', orden };
    }

    // 3. Simulador de éxito (80% pasan, 20% fallan)
    const pagoExitoso = Math.random() > 0.2; 
    
    if (!pagoExitoso) {
      throw new BadRequestException('Fondo insuficiente o método de pago rechazado');
    }

    // 4. Si pasa, actualizamos la orden y guardamos en MySQL
    orden.estado = 'PAGADA';
    // Aquí podrías guardar el método de pago si agregas la columna a tu entidad

    const ordenActualizada = await this.paymentRepository.save(orden);
    return { estado: 'EXITO', mensaje: 'Pago procesado correctamente', orden: ordenActualizada };
  }
}