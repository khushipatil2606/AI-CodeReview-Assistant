import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

interface AnalyticsData {
  repositories: number;
  stars: number;
  top_language: string;
}

function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    repositories: 0,
    stars: 0,
    top_language: "Loading...",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/github/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error(err));
  }, []);

  // Demo chart data
  const languageData = [
    { name: analytics.top_language, value: analytics.repositories },
    { name: "Others", value: 1 },
  ];

  const repoData = [
    {
      name: "Repositories",
      value: analytics.repositories,
    },
    {
      name: "Stars",
      value: analytics.stars,
    },
  ];

  const COLORS = ["#3B82F6", "#10B981"];

  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        GitHub Analytics
      </h1>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-slate-400 text-lg">
            Repositories
          </h2>

          <p className="text-5xl font-bold text-blue-400 mt-4">
            {analytics.repositories}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-slate-400 text-lg">
            Total Stars
          </h2>

          <p className="text-5xl font-bold text-yellow-400 mt-4">
            ⭐ {analytics.stars}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-slate-400 text-lg">
            Top Language
          </h2>

          <p className="text-3xl font-bold text-green-400 mt-4">
            {analytics.top_language}
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-white text-2xl font-bold mb-6">
            Language Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={languageData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {languageData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* Bar Chart */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-white text-2xl font-bold mb-6">
            Repository Statistics
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={repoData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default Analytics;