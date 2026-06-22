import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent {

  result: any;

  constructor(private router: Router) {
    this.result = history.state.result;
  }

  goHome() {
    this.router.navigate(['/payment/1']);
  }
}