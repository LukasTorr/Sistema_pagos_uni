import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { CardFormComponent } from '../card-form/card-form.component';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';
import { WalletFormComponent } from '../wallet-form/wallet-form.component';

@Component({
  selector: 'app-payment-selector',
  standalone: true,
  imports: [
    CommonModule,
    CardFormComponent,
    TransferFormComponent,
    WalletFormComponent
  ],
  templateUrl: './payment-selector.component.html'
})
export class PaymentSelectorComponent {

  selectedMethod: string = 'card';

  cardForm: FormGroup | null = null; // ✔ más seguro que !:

  constructor(private router: Router) {}

  /* =========================
     CAMBIO DE MÉTODO
  ========================= */
  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  /* =========================
     RECIBE FORM DESDE CARD COMPONENT
  ========================= */
  onCardFormReady(form: FormGroup) {
    this.cardForm = form;
  }

  /* =========================
     SUBMIT GLOBAL
  ========================= */
  submit() {

    if (this.selectedMethod === 'card') {

      if (!this.cardForm) {
        return;
      }

      if (this.cardForm.invalid) {
        this.cardForm.markAllAsTouched();
        return;
      }
    }

    const result = {
      status: 'PAID',
      orderId: this.generateOrderId(),
      processedAt: new Date(),
      rejectionReason: null
    };

    this.router.navigate(['/payment/result'], {
      state: { result }
    });
  }

  /* =========================
     UTIL: ORDER ID SIMPLE
  ========================= */
  private generateOrderId(): string {
    return Math.floor(Math.random() * 1000000000).toString();
  }

}