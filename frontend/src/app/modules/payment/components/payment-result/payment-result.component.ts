import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentResult } from '../../models/payment-result.model';
import { OrderStatus } from '../../../../shared/enums/order-status.enum';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-result.component.html'
})
export class PaymentResultComponent {

  @Input() result!: PaymentResult;

  OrderStatus = OrderStatus;

}