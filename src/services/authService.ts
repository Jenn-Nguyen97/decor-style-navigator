
import { apiRequest } from './api';
import { UserRegisterRequest, UserLoginRequest, AuthResponse } from '@/types/api';

export async function register(userData: UserRegisterRequest): Promise<void> {
  await apiRequest('/auth/register', 'POST', userData);
}

export async function login(credentials: UserLoginRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/login', 'POST', credentials);
}

export function saveAuthToken(token: string): void {
  localStorage.setItem('decor_token', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('decor_token');
}

export function removeAuthToken(): void {
  localStorage.removeItem('decor_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
