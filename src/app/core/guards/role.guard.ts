import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role.enum';

/**
 * Factory de guard: uso en rutas como
 *   { path: 'admin', canActivate: [roleGuard([Role.ADMIN])], ... }
 */
export const roleGuard = (allowedRoles: Role[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.hasRole(...allowedRoles)) return true;

    router.navigate(['/access-denied']);
    return false;
  };
};
