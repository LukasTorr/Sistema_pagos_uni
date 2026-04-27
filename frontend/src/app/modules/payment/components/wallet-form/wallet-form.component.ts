import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet-form.component.html'
})
export class WalletFormComponent {

  identifier: string = '';
  pin: string = '';
}