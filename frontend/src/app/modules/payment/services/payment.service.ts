import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

export interface CreatePaymentPayload {
  referenceId: string;
  originService: string;
  amount: number;
  paymentMethod: string;
  callbackUrl: string;
  description: string;
}

export interface ConfirmPaymentPayload {
  status: 'APPROVED' | 'REJECTED';
  rejectionReason?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly apiUrl = environment.paymentsUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createOrder(payload: CreatePaymentPayload): Observable<any> {
    return this.ensureSystemToken().pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/orders`, payload)
      )
    );
  }

  getPayment(referenceId: string): Observable<any> {
    return this.ensureSystemToken().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/${referenceId}`)
      )
    );
  }

  confirmPayment(
    referenceId: string,
    payload: ConfirmPaymentPayload
  ): Observable<any> {
    return this.ensureSystemToken().pipe(
      switchMap(() =>
        this.http.patch(
          `${this.apiUrl}/${referenceId}/confirm`,
          payload
        )
      )
    );
  }

  private ensureSystemToken(): Observable<any> {
    const token = this.authService.getToken();

    if (token && !this.isTokenExpired(token)) {
      return of(token);
    }

    localStorage.removeItem('nyu_token');
    localStorage.removeItem('nyu_user');

    return this.authService.getTokenByPrivateKey(
      environment.systemPrivateKey
    );
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      const now = Math.floor(Date.now() / 1000);

      return payload.exp <= now;
    } catch {
      return true;
    }
  }
}