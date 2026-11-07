const AUTH_KEY = "employee_panel_auth";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payload = JSON.parse(window.atob(parts[1]));
    if (!payload.exp) return false;

    return Date.now() >= payload.exp * 1000;
  } catch (e) {
    return true;
  }
};

// to get employee user
export const getEmployeeUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    if (parsed && parsed.token && isTokenExpired(parsed.token)) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }

    return parsed;
  } catch (e) {
    return null;
  }
};

export const isEmployeeLoggedIn = () => {
  const user = getEmployeeUser();
  return !!user && !!user.token;
};

// to save togged-in user details
export const saveEmployeeLogin = (userData) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  } catch {
    // ignore
  }
};

export const clearEmployeeLogin = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
};
