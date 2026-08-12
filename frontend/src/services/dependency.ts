const API = "http://127.0.0.1:8000";

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