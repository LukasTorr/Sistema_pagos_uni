export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiErrorDto {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  password: string;
  gender: string;
}

export interface RegisterResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}