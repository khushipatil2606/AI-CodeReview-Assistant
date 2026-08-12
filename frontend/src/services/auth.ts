const API = import.meta.env.VITE_API_URL;

export const githubLogin = () => {
  window.location.href = `${API}/auth/github/login`;
};