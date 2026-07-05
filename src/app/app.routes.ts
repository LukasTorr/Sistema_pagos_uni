import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.component').then((m) => m.RegisterComponent),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent), // placeholder simple
  },
  { path: '**', redirectTo: 'login' }, // control de rutas no esperadas
];
