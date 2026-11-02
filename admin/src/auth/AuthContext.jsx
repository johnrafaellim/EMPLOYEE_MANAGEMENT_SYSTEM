import { AUTH_STORAGE_KEY, AuthContext } from './authStore.js';
import { useMemo, useState } from 'react';

// to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(window.atob(parts[1]));
    if (!payload.exp) return false;

    return Date.now() >= payload.exp * 1000;
  } catch (e) {
    return true;
  }
};

// to read data of stored user
const readStoredUser = () => {
  try {
    const rawUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawUser) return null;
    const parsed = JSON.parse(rawUser);

    if (parsed && parsed.token && isTokenExpired(parsed.token)) {
      window.localStorage.remoteItem(AUTH_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch (e) {
    return null;
  }
};

// to setup AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser());

  const login = async ({ email, password }) => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return {
        ok: false,
        message: 'Enter both email and password to continue.',
      };
    }

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: cleanEmail,
            password: cleanPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return {
          ok: false,
          message: data.message || 'Login Failed',
        };
      }

      if (data.role !== 'admin') {
        return {
          ok: false,
          message: 'Access Denied. You do not have administrator privileges.',
        };
      }

      const nextUser = {
        email: cleanEmail,
        name: data.name || cleanEmail.split('@')[0],
        role: data.role,
        token: data.token,
        loginAt: new Date().toISOString(),
      };

      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return { ok: true };
    } catch (e) {
      console.error('Login Error: ', e);
      return { ok: false, message: 'Server Error' };
    }
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      login,
      logout,
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
