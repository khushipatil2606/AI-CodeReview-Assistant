const API = import.meta.env.VITE_API_URL;

// ---------------- GitHub Login ----------------

export const githubLogin = () => {
  window.location.href = `${API}/auth/github/login`;
};


// ---------------- Save GitHub Token ----------------

export const saveGitHubToken = () => {

  const params = new URLSearchParams(
    window.location.search
  );

  const token = params.get("token");

  if (token) {

    localStorage.setItem(
      "github_token",
      token
    );

    // Remove token from browser URL
    window.history.replaceState(
      {},
      document.title,
      "/dashboard"
    );

    return true;
  }

  return false;
};


// ---------------- Get GitHub Token ----------------

export const getGitHubToken = () => {
  return localStorage.getItem("github_token");
};


// ---------------- Logout ----------------

export const logoutGitHub = () => {

  localStorage.removeItem(
    "github_token"
  );

  window.location.href = "/";
};