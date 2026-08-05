const API = "http://127.0.0.1:8000";

// AI Review
export async function getAIReview() {
  const response = await fetch(`${API}/review/khushipatil2606/AI-StudyMate/1`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI Review");
  }

  return await response.json();
}

// Review History
export async function getReviewHistory() {
  const response = await fetch(`${API}/review/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch Review History");
  }

  return await response.json();
}