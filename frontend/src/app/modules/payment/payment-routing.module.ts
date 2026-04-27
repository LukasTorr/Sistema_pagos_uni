import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSelectorComponent } from './components/payment-selector/payment-selector.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }