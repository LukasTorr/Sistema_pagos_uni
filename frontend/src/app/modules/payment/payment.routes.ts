import { Routes } from '@angular/router';
import { PaymentSelectorComponent } from './components/payment-selector/payment-selector.component';
import { PaymentResultComponent } from './components/payment-result/payment-result.component';

export const PAYMENT_ROUTES: Routes = [
  {
    path: 'result',
    component: PaymentResultComponent
  },
  {
    path: ':id',
    component: PaymentSelectorComponent
  }
];