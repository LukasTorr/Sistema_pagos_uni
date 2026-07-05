import { Role } from './role.enum';

/** Representa al usuario autenticado, derivado del payload del JWT. */
export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  /** Sistema del ecosistema al que pertenece el usuario (matrícula, residencia, etc.), si aplica. */
  system?: string;
}

/** Forma cruda del payload que se espera dentro del JWT (antes de mapear a AuthenticatedUser). */
export interface JwtPayload {
  sub: string;
  email: string;
  fullName: string;
  role: string;
  system?: string;
  exp: number;
  iat: number;
}
