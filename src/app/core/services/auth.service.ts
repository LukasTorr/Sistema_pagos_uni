import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from '../models/auth-dto';
import { AuthenticatedUser } from '../models/user.model';
import { Role } from '../models/role.enum';

const SESSION_KEY = 'nyu_session_user';

/**
 * ⚠️ TEMPORAL: el backend actual de /v1/users/login NO devuelve un JWT,
 * solo datos del usuario en texto plano. Esto es un hueco de seguridad real
 * que se le debe reportar al equipo de backend (ver conversación con el
 * jefe de equipo). En cuanto exista un accessToken real, hay que volver
 * al modelo anterior con decodeToken() y Authorization: Bearer.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<AuthenticatedUser | null>(this.readUserFromStorage());
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  constructor(private http: HttpClient) {}

  register(data: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${environment.authApiUrl}/users/register`, data);
  }

  login(credentials: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${environment.authApiUrl}/users/login`, credentials).pipe(
      tap((response) => this.persistSession(response)),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this._currentUser.set(null);
  }

  /** Sin JWT no hay nada que mandar como Bearer todavía. */
  getToken(): string | null {
    return null;
  }

  hasRole(...roles: Role[]): boolean {
    const user = this._currentUser();
    return !!user && roles.includes(user.role);
  }

  private persistSession(response: LoginResponseDto): void {
    const user: AuthenticatedUser = {
      id: response.id,
      email: response.email,
      fullName: `${response.firstName} ${response.lastName}`,
      role: Role.STUDENT, // el backend aún no informa rol; se asume STUDENT por defecto
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    this._currentUser.set(user);
  }

  private readUserFromStorage(): AuthenticatedUser | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthenticatedUser;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }
}
