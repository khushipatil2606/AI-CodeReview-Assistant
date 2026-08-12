const API = import.meta.env.VITE_API_URL;

// ---------------- Repositories ----------------
export async function getRepositories() {
  const response = await fetch(`${API}/github/repositories`);

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
    `${API}/github/pulls/${owner}/${repo}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pull requests.");
  }

  return response.json();
}

// ---------------- Profile ----------------
export async function getProfile() {
  const response = await fetch(
    `${API}/github/profile`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile.");
  }

  return response.json();
}