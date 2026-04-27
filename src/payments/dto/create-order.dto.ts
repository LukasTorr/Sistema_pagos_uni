import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  idAlumno!: string;

  @IsString()
  @IsNotEmpty()
  servicio!: string;

  @IsNumber()
  monto!: number;
}