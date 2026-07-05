import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Manejo centralizado de errores no esperados:
 * - 401: token inválido/expirado -> cierra sesión y redirige a login.
 * - 403: sin permiso -> redirige a pantalla de acceso denegado.
 * - resto: se re-lanza para que cada componente decida cómo mostrarlo.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout();
        router.navigate(['/login'], { queryParams: { expired: true } });
      }
      if (error.status === 403) {
        router.navigate(['/access-denied']);
      }
      return throwError(() => error);
    })
  );
};
