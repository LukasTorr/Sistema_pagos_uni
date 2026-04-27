import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
    // Sin rol requerido → Admin y Operador pueden entrar
    // pero el operador solo ve sus órdenes (filtrado en componente)
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./modules/payment/payment.module').then(m => m.PaymentModule)
    // Sin guard → acceso público para el usuario final
  },
  {
    path: 'receipt',
    loadChildren: () =>
      import('./modules/receipt/receipt.module').then(m => m.ReceiptModule)
    // Sin guard → acceso público para ver comprobante
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
    // Admin y Operador pueden entrar
  },
  {
    path: 'audit',
    loadChildren: () =>
      import('./modules/audit/audit.module').then(m => m.AuditModule),
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
    // Solo Admin puede ver la bitácora
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];