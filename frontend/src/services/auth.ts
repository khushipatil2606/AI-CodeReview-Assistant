const API = "http://127.0.0.1:8000";

export const githubLogin = () => {
    window.location.href = `${API}/auth/github/login`;
};