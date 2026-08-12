const API = import.meta.env.VITE_API_URL;

export async function analyzeArchitecture(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/architecture/${owner}/${repo}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to analyze architecture");
  }

  return await response.json();
}