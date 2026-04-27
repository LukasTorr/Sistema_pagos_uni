import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { luhnValidator } from '../../luhn.validator';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-form.component.html'
})
export class CardFormComponent {

  form: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      cardNumber: ['', [Validators.required, luhnValidator]],
      holder: ['', [Validators.required]],
      expiry: ['', [Validators.required, this.expiryValidator]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });

  }

  ngOnInit() {
    this.formReady.emit(this.form);
  }

  /* =========================
     FORMATEO TARJETA EN TIEMPO REAL
  ========================= */
  formatCardNumber(event: any) {

    let value = event.target.value;

    // solo números
    value = value.replace(/\D/g, '');

    // limitar a 16 dígitos
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    // agrupar cada 4 dígitos
    value = value.replace(/(.{4})/g, '$1 ').trim();

    this.form.get('cardNumber')?.setValue(value, { emitEvent: false });

    // marcar como tocado para validación en vivo
    this.form.get('cardNumber')?.markAsTouched();
  }

  /* =========================
     EXPIRACIÓN MM/YY
  ========================= */
  expiryValidator(control: any) {

    const value = control.value;

    if (!value) return null;
    if (!/^\d{2}\/\d{2}$/.test(value)) return { invalidExpiry: true };

    const [month, year] = value.split('/').map(Number);

    if (month < 1 || month > 12) return { invalidExpiry: true };

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return { invalidExpiry: true };
    if (year === currentYear && month < currentMonth) return { invalidExpiry: true };

    return null;
  }

  /* =========================
     HELPERS UI
  ========================= */
  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

}