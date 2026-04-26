import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent }       from './components/navbar/navbar.component';
import { SpinnerComponent }      from './components/spinner/spinner.component';
import { AlertComponent }        from './components/alert/alert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OrderStatusLabelPipe }  from './pipes/order-status-label.pipe';
import { CurrencyClpPipe }       from './pipes/currency-clp.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    AlertComponent,
    PageNotFoundComponent,
    OrderStatusLabelPipe,
    CurrencyClpPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SpinnerComponent,
    AlertComponent,
    PageNotFoundComponent,
    OrderStatusLabelPipe,
    CurrencyClpPipe,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {}