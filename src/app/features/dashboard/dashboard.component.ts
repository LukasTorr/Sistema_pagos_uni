import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Pantalla puente tras un login exitoso.
 * - Si vino un "redirect" válido (otro sistema del ecosistema pidió el login),
 *   muestra "Sesión iniciada" un instante y redirige de vuelta a ese sistema.
 * - Si no vino redirect (alguien entró directo a este login), se queda como
 *   panel simple con botón de cerrar sesión.
 *
 * ⚠️ Nota: como el backend aún no emite JWT real, por ahora se manda de vuelta
 * solo id/email/nombre como query params. Cuando el backend entregue accessToken,
 * hay que cambiar este bloque para mandar `#token=...` en vez de estos query params.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-shell">
      <div class="success-shell__bg" aria-hidden="true"></div>
      <div class="success-card">
        <div class="spinner-border text-nyu mb-3" role="status" *ngIf="redirecting()"></div>
        <h2 class="display mb-2">Sesión iniciada correctamente</h2>
        <p class="text-muted mb-1">{{ auth.currentUser()?.fullName }}</p>
        <p class="text-muted small" *ngIf="redirecting()">Redirigiendo a tu aplicación…</p>

        <button class="btn-nyu-outline mt-4" *ngIf="!redirecting()" (click)="logout()">
          Cerrar sesión
        </button>
      </div>
    </div>
  `,
  styles: [`
    .success-shell {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .success-shell__bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      background-color: var(--nyu-violet-950);
      background-image:
        repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 90px),
        repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 90px);
    }
    .success-card {
      position: relative;
      z-index: 1;
      background: white;
      padding: 3rem 2.5rem;
      border-radius: 2px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.35);
      max-width: 22rem;
    }
    .text-nyu { color: var(--nyu-violet-600); }
  `],
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly redirecting = signal(false);

  ngOnInit(): void {
    const redirectUrl = this.route.snapshot.queryParamMap.get('redirect');
    if (!redirectUrl) return;

    this.redirecting.set(true);
    const user = this.auth.currentUser();

    setTimeout(() => {
      const params = new URLSearchParams({
        id: user?.id ?? '',
        email: user?.email ?? '',
        fullName: user?.fullName ?? '',
      });
      window.location.href = `${redirectUrl}?${params.toString()}`;
    }, 1200);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
