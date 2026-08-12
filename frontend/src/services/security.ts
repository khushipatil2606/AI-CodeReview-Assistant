const API = import.meta.env.VITE_API_URL;

export async function analyzeSecurity(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/security/${owner}/${repo}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze security");
  }

  return await response.json();
}