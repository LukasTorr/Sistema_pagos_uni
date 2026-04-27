import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Importamos el Guardia
import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Esta ruta la dejamos PÚBLICA (sin guardia) para que los otros equipos 
  // puedan mandarte las órdenes de cobro sin necesidad de iniciar sesión como humanos.
  @Post('orders')
  crearOrdenDeCobro(@Body() createOrderDto: CreateOrderDto) {
    return this.paymentsService.crearOrden(createOrderDto);
  }

  // ¡AQUÍ ESTÁ EL CANDADO! 
  // Esta ruta está PROTEGIDA. Solo pasa si trae un Access Token válido.
  @UseGuards(AuthGuard('jwt')) 
  @Post('orders/:id/pay')
  simularPago(
    @Param('id') id: number, 
    @Body() processPaymentDto: ProcessPaymentDto
  ) {
    return this.paymentsService.procesarPago(id, processPaymentDto);
  }
}