import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { ApiErrorDto } from '../../core/models/auth-dto';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

function nyuEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string) ?? '';
  if (!value) return null;
  return value.toLowerCase().trim().endsWith('@nyu.edu') ? null : { nyuEmail: true };
}

function rutValidator(control: AbstractControl): ValidationErrors | null {
  const value = ((control.value as string) ?? '').trim().toUpperCase();
  if (!value) return null;

  const rutFormat = /^\d{7,8}-[0-9K]$/;
  if (!rutFormat.test(value)) return { rutFormat: true };

  const [body, dv] = value.split('-');
  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += multiplier * Number(body[i]);
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = 11 - (sum % 11);
  const expectedDv = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder);

  return dv === expectedDv ? null : { rutChecksum: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      rut: ['', [Validators.required, rutValidator]],
      email: ['', [Validators.required, Validators.email, nyuEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator }
  );

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { firstName, lastName, rut, email, password } = this.form.getRawValue();

    this.auth.register({ firstName, lastName, rut, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set('Cuenta creada. Ya puedes iniciar sesión.');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  private extractErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'No se pudo contactar al servidor. Verifica tu conexión e intenta nuevamente.';
    }
    if (err.status === 409) {
      return 'Ya existe una cuenta con ese correo o RUT.';
    }
    const body = err.error as ApiErrorDto | undefined;
    if (body?.message) {
      return Array.isArray(body.message) ? body.message[0] : body.message;
    }
    return 'Ocurrió un error inesperado. Intenta nuevamente en unos minutos.';
  }
}


