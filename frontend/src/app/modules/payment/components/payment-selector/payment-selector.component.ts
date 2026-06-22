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

  cardForm: FormGroup | null = null;
  transferForm: FormGroup | null = null;
  walletForm: FormGroup | null = null;

  isProcessing = false;

  constructor(private router: Router) {}

  selectMethod(method: string): void {
    this.selectedMethod = method;
  }

  onCardFormReady(form: FormGroup): void {
    this.cardForm = form;
  }

  onTransferFormReady(form: FormGroup): void {
    this.transferForm = form;
  }

  onWalletFormReady(form: FormGroup): void {
    this.walletForm = form;
  }

  get activeForm(): FormGroup | null {

    if (this.selectedMethod === 'card') {
      return this.cardForm;
    }

    if (this.selectedMethod === 'transfer') {
      return this.transferForm;
    }

    if (this.selectedMethod === 'wallet') {
      return this.walletForm;
    }

    return null;
  }

  canPay(): boolean {
    return !!this.activeForm && this.activeForm.valid;
  }

  submit(): void {

    if (!this.activeForm) {
      return;
    }

    if (this.activeForm.invalid) {
      this.activeForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    setTimeout(() => {

      const result = {
        status: 'PAID',
        orderId: this.generateOrderId(),
        processedAt: new Date(),

        amount: 150000,

        paymentMethod:
          this.selectedMethod === 'card'
            ? 'Tarjeta'
            : this.selectedMethod === 'transfer'
            ? 'Transferencia'
            : 'Billetera Digital',

        transactionId:
          'TXN-' + Math.floor(Math.random() * 1000000000),

        authorizationCode:
          'AUTH-' + Math.floor(Math.random() * 100000),

        rejectionReason: null
      };

      this.router.navigate(
        ['/payment/result'],
        {
          state: { result }
        }
      );

    }, 1800);
  }

  private generateOrderId(): string {
    return Math.floor(
      Math.random() * 1000000000
    ).toString();
  }
}