import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transfer-form.component.html'
})
export class TransferFormComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bank: ['', Validators.required],
      accountNumber: ['', Validators.required],
      rut: ['', Validators.required]
    });
  }

  getData() {
    return this.form.value;
  }
}