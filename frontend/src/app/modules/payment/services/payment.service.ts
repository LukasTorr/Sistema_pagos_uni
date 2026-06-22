import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly apiUrl =
    'http://localhost:3000/v1/payments';

  constructor(
    private http: HttpClient
  ) {}

  createOrder(
    payload: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/orders`,
      payload
    );
  }

  getPayment(
    referenceId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${referenceId}`
    );
  }

  confirmPayment(
    referenceId: string
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/${referenceId}/confirm`,
      {}
    );
  }
}