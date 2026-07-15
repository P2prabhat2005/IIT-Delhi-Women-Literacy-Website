import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiGet, apiSend } from '../utils/apiClient.js';

const AuthContext = createContext(null);

/**
 * Replaces the old `DEV_IMAGE_EDITOR` static flag with a real, reactive
 * authentication state backed by the `/api/auth` endpoints. The session
 * itself lives in an HTTP-only cookie set by the server — this context only
 * tracks whether that session is currently valid.
 */
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const data = await apiGet('/auth/me');
      setAdmin(data?.admin || null);
    } catch {
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (username, password) => {
    const data = await apiSend('POST', '/auth/login', { username, password });
    setAdmin(data.admin);
    return data.admin;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiSend('POST', '/auth/logout');
    } finally {
      setAdmin(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      admin,
      isAdmin: Boolean(admin),
      isLoading,
      login,
      logout,
      refreshSession,
    }),
    [admin, isLoading, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
