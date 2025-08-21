// Lightweight API helper that automatically attaches Authorization header if a token exists
// Uses the same storage key as AuthContext

const STORAGE_KEY = 'auth_state_v1';

export const getAuthToken = (): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token ?? null;
  } catch {
    return null;
  }
};

export type ApiOptions = RequestInit & { auth?: boolean };

export async function apiFetch<T = any>(input: string, init: ApiOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = init;
  const token = auth ? getAuthToken() : null;

  const res = await fetch(input, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || 'Request failed';
    throw new Error(message);
  }
  return data as T;
}
