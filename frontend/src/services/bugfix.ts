const API = "http://127.0.0.1:8000";

export async function analyzeBugFixes(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/bugfix/${owner}/${repo}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze bugs");
  }

  return await response.json();
}