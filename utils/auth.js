// Utilidades para manejo de sesión y roles
export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function getUserRole() {
  const payload = getToken() ? JSON.parse(atob(getToken().split('.')[1])) : null;
  return payload?.role || null;
}

export function isAuthenticated() {
  return !!getToken();
}
