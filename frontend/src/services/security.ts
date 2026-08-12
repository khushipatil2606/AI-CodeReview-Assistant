const API = "http://127.0.0.1:8000";

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