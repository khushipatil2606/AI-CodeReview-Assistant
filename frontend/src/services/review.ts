const API = import.meta.env.VITE_API_URL;

export async function getAIReview(
  owner: string,
  repo: string,
  prNumber: number
) {
  const response = await fetch(
    `${API}/review/${owner}/${repo}/${prNumber}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to generate review");
  }

  return await response.json();
}

export async function getReviewHistory() {
  const response = await fetch(`${API}/review/history`);

  if (!response.ok) {
    throw new Error("Unable to fetch history");
  }

  return await response.json();
}

export async function getReviewStatistics() {
  const response = await fetch(
    `${API}/review/statistics`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return response.json();
}