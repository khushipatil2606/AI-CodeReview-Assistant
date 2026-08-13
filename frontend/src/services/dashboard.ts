const API = import.meta.env.VITE_API_URL;

export async function getDashboard() {
  const token = localStorage.getItem("github_token");

  const response = await fetch(`${API}/dashboard`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard.");
  }

  return response.json();
}