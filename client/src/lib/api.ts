/**
 * API Client Utility for MediLink
 * Handles base URL configuration, token injection, and safe JSON response parsing.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173'
    ? 'http://localhost:5000'
    : '');

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  error?: string;
  meta?: any;
}

export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const token = typeof window !== 'undefined' ? localStorage.getItem('medilink_token') : null;
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const text = await response.text();
    let result: ApiResponse<T> | null = null;

    if (text && text.trim().length > 0) {
      try {
        result = JSON.parse(text);
      } catch {
        // If HTML or text non-JSON response returned
        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status} (${response.statusText}).`);
        }
        throw new Error('Server returned invalid response format.');
      }
    }

    if (!response.ok) {
      const errorMsg = result?.message || result?.error || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    if (result && typeof result === 'object' && 'success' in result && result.success === false) {
      throw new Error(result.message || 'Operation failed');
    }

    return result || ({ success: true } as ApiResponse<T>);
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
      throw new Error('Unable to connect to MediLink API server. Please check your internet connection or server status.');
    }
    throw err;
  }
}
