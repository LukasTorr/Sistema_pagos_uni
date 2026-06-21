import { Routes } from '@angular/router';
import { PaymentSelectorComponent } from './components/payment-selector/payment-selector.component';
import { PaymentResultComponent } from './components/payment-result/payment-result.component';

export const PAYMENT_ROUTES: Routes = [
  {
    path: ':id',
    component: PaymentSelectorComponent
  },
  {
    path: 'result',
    component: PaymentResultComponent
  }
];