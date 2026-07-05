import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { ApiErrorDto } from '../../core/models/auth-dto';
import { environment } from '../../../environments/environment';

type LoginStep = 'identifier' | 'password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly step = signal<LoginStep>('identifier');

  rememberMe = false;
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  goToPasswordStep(): void {
    const emailControl = this.form.controls.email;
    if (emailControl.invalid) {
      emailControl.markAsTouched();
      return;
    }
    this.errorMessage.set(null);
    this.step.set('password');
  }

  goBackToIdentifierStep(): void {
    this.step.set('identifier');
    this.form.controls.password.reset();
  }

  onSubmit(): void {
    if (this.step() === 'identifier') {
      this.goToPasswordStep();
      return;
    }

    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const credentials = this.form.getRawValue();

    this.auth.login(credentials).subscribe({
      next: () => {
        this.loading.set(false);
        const redirectUrl = this.getSafeRedirectUrl();

        this.router.navigate(['/dashboard'], {
          queryParams: redirectUrl ? { redirect: redirectUrl } : {},
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  /** Valida que el "redirect" recibido por query param sea de un dominio autorizado. */
  private getSafeRedirectUrl(): string | null {
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    if (!redirect) return null;

    try {
      const url = new URL(redirect);
      return environment.allowedRedirectHosts.includes(url.host) ? redirect : null;
    } catch {
      return null;
    }
  }

  private extractErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'No se pudo contactar al servidor. Verifica tu conexión e intenta nuevamente.';
    }
    if (err.status === 401) {
      return 'NetID o contraseña incorrectos.';
    }
    const body = err.error as ApiErrorDto | undefined;
    if (body?.message) {
      return Array.isArray(body.message) ? body.message[0] : body.message;
    }
    return 'Ocurrió un error inesperado. Intenta nuevamente en unos minutos.';
  }
}
