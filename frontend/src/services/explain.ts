const API = import.meta.env.VITE_API_URL;
export async function getRepositoryFiles(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${API}/explain/${owner}/${repo}/files`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository files");
  }

  return await response.json();
}

export async function explainFile(
  owner: string,
  repo: string,
  filePath: string
) {
  const response = await fetch(
    `${API}/explain/${owner}/${repo}?file_path=${encodeURIComponent(filePath)}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to explain file");
  }

  return await response.json();
}