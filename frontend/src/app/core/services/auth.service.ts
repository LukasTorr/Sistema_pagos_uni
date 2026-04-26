import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../modules/auth/models/login.dto';
import { AuthResponse } from '../../modules/auth/models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'nyu_token';
  private readonly USER_KEY  = 'nyu_user';
  private readonly apiUrl    = environment.apiUrl;

  private _isLoggedIn$  = new BehaviorSubject<boolean>(false);
  private _currentUser$ = new BehaviorSubject<any>(null);

  isLoggedIn$  = this._isLoggedIn$.asObservable();
  currentUser$ = this._currentUser$.asObservable();

  constructor(private http: HttpClient) {}

  checkSession(): void {
    const token = this.getToken();
    const user  = this.getStoredUser();
    if (token && user) {
      this._isLoggedIn$.next(true);
      this._currentUser$.next(user);
    }
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`, dto
    ).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
        this._isLoggedIn$.next(true);
        this._currentUser$.next(res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._isLoggedIn$.next(false);
    this._currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getStoredUser(): any {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}