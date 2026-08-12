import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface AnalyticsData {
  repositories: number;
  stars: number;
  top_language: string;
}

interface ReviewStatistics {
  total_reviews: number;
  average_score: number;
  total_bugs: number;
  total_security: number;
  total_performance: number;
}

function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    repositories: 0,
    stars: 0,
    top_language: "Loading...",
  });

  const [stats, setStats] = useState<ReviewStatistics>({
    total_reviews: 0,
    average_score: 0,
    total_bugs: 0,
    total_security: 0,
    total_performance: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/github/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(console.error);

    fetch("http://127.0.0.1:8000/review/statistics")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  const pieData = {
    labels: ["Bugs", "Security", "Performance"],
    datasets: [
      {
        data: [
          stats.total_bugs,
          stats.total_security,
          stats.total_performance,
        ],
        backgroundColor: [
          "#ef4444",
          "#facc15",
          "#22c55e",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Repositories",
      "Stars",
      "Reviews",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          analytics.repositories,
          analytics.stars,
          stats.total_reviews,
        ],
        backgroundColor: [
          "#3b82f6",
          "#facc15",
          "#22c55e",
        ],
      },
    ],
  };

  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        GitHub Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-slate-400">
            Repositories
          </h2>

          <p className="text-5xl text-blue-400 font-bold mt-4">
            {analytics.repositories}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-slate-400">
            Stars
          </h2>

          <p className="text-5xl text-yellow-400 font-bold mt-4">
            ⭐ {analytics.stars}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-slate-400">
            Top Language
          </h2>

          <p className="text-2xl text-green-400 font-bold mt-4">
            {analytics.top_language}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-slate-400">
            Average Review Score
          </h2>

          <p className="text-5xl text-cyan-400 font-bold mt-4">
            {stats.average_score}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-white text-2xl font-bold mb-6">
            AI Review Distribution
          </h2>

          <Pie data={pieData} />

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-white text-2xl font-bold mb-6">
            GitHub Statistics
          </h2>

          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default Analytics;