import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer-form.component.html'
})
export class TransferFormComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      account: [''],
      bank: ['']
    });
  }
}