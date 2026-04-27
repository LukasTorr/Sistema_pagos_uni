import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaymentRoutingModule } from './payment-routing.module';

import { PaymentSelectorComponent } from './components/payment-selector/payment-selector.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import { PaymentResultComponent } from './components/payment-result/payment-result.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PaymentSelectorComponent,
    CardFormComponent,
    TransferFormComponent,
    WalletFormComponent,
    PaymentResultComponent,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }