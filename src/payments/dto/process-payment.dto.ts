import { IsString, IsNotEmpty } from 'class-validator';

// Asegúrate de que esta línea empiece con "export class" y tenga mayúsculas
export class ProcessPaymentDto {
  @IsString()
  @IsNotEmpty()
  metodoPago!: string;

  @IsString()
  @IsNotEmpty()
  transactionKey!: string;
}