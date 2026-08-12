const API = import.meta.env.VITE_API_URL;
export async function analyzeCodeQuality(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/code-quality/${owner}/${repo}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to analyze code quality");
  }

  return await response.json();
}