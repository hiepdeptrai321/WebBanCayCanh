const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";

function getStoredUser() {
  try {
    const rawValue = window.localStorage.getItem(AUTH_USER_KEY);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function isAdminUser(user) {
  return user?.role === "admin";
}

export function getAdminSession() {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
  const user = getStoredUser();

  if (!token || !isAdminUser(user)) {
    return null;
  }

  return { token, user };
}

export function isAdminLoggedIn() {
  return Boolean(getAdminSession());
}
