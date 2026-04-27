import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  selectedMethod: 'card' | 'transfer' | 'wallet' = 'card';

  @ViewChild(CardFormComponent) cardForm!: CardFormComponent;
  @ViewChild(TransferFormComponent) transferForm!: TransferFormComponent;
  @ViewChild(WalletFormComponent) walletForm!: WalletFormComponent;

  @Output() paymentData = new EventEmitter<any>();

  selectMethod(method: 'card' | 'transfer' | 'wallet') {
    this.selectedMethod = method;
  }

  submit() {
    let data;

    switch (this.selectedMethod) {
      case 'card':
        data = this.cardForm.getData();
        break;
      case 'transfer':
        data = this.transferForm.getData();
        break;
      case 'wallet':
        data = this.walletForm.getData();
        break;
    }

    this.paymentData.emit({
      method: this.selectedMethod,
      data
    });
  }
}