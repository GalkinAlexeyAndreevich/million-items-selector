import { API_URL } from '@/shared/config/env';

export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}
