import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wallet-form.component.html'
})
export class WalletFormComponent {

  identifier: string = '';
  pin: string = '';

  getData() {
    return {
      identifier: this.identifier,
      pin: this.pin
    };
  }
}