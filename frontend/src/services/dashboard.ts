const API = import.meta.env.VITE_API_URL;
export async function getDashboard() {
  // Get GitHub dashboard information
  const dashboardResponse = await fetch(`${API}/dashboard`);

  if (!dashboardResponse.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  const dashboardData = await dashboardResponse.json();

  // Get AI review statistics
  const statisticsResponse = await fetch(
    `${API}/review/statistics`
  );

  if (!statisticsResponse.ok) {
    throw new Error("Failed to fetch review statistics");
  }

  const statisticsData = await statisticsResponse.json();

  // Combine both API responses
  return {
    ...dashboardData,

    reviews: statisticsData.total_reviews,

    review_statistics: {
      total_reviews: statisticsData.total_reviews,
      average_score: statisticsData.average_score,
      bugs: statisticsData.bugs,
      security: statisticsData.security,
      performance: statisticsData.performance,
    },
  };
}