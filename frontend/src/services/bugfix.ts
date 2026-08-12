const API = import.meta.env.VITE_API_URL;
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