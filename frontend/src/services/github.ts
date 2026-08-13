const API = import.meta.env.VITE_API_URL;

const getToken = (): string | null => {
  return localStorage.getItem("github_token");
};

const authHeaders = (): HeadersInit => {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// ---------------- Repositories ----------------
export async function getRepositories() {
  const response = await fetch(
    `${API}/github/repositories`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories.");
  }

  return response.json();
}

// ---------------- Pull Requests ----------------
export async function getPullRequests(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/github/pulls/${owner}/${repo}`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pull requests.");
  }

  return response.json();
}

// ---------------- Profile ----------------
export async function getProfile() {
  const response = await fetch(
    `${API}/github/profile`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile.");
  }

  return response.json();
}