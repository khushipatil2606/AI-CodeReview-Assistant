const API = import.meta.env.VITE_API_URL;
export async function analyzeDependencies(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/dependency/${owner}/${repo}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to analyze dependencies");
  }

  return await response.json();
}