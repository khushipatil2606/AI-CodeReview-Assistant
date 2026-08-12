import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../../services/dashboard";

interface DashboardData {
  repositories: number;
  followers: number;
  reviews: number;

  latest_reviews: {
    repository: string;
    score: number;
  }[];

  latest_repositories: {
    name: string;
    owner: string;
  }[];

  review_statistics: {
    total_reviews: number;
    average_score: number;
    bugs: number;
    security: number;
    performance: number;
  };
}

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    repositories: 0,
    followers: 0,
    reviews: 0,

    latest_reviews: [],
    latest_repositories: [],

    review_statistics: {
      total_reviews: 0,
      average_score: 0,
      bugs: 0,
      security: 0,
      performance: 0,
    },
  });

  useEffect(() => {
    getDashboard()
      .then((data) => {
        console.log("Dashboard Data:", data);
        setDashboard(data);
      })
      .catch((error) => {
        console.error("Dashboard Error:", error);
      });
  }, []);

  return (
    <div>

      {/* ================= HEADER ================= */}

      <h1 className="text-4xl font-bold text-white mb-2">
        AI Code Review Assistant
      </h1>

      <p className="text-slate-400 mb-8">
        Welcome back! Here's your GitHub overview.
      </p>


      {/* ================= GITHUB STATISTICS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Repositories */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-slate-400">
            Repositories
          </h2>

          <p className="text-5xl font-bold text-blue-400 mt-3">
            {dashboard.repositories}
          </p>

        </div>


        {/* Followers */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-slate-400">
            Followers
          </h2>

          <p className="text-5xl font-bold text-green-400 mt-3">
            {dashboard.followers}
          </p>

        </div>


        {/* AI Reviews */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-slate-400">
            AI Reviews
          </h2>

          <p className="text-5xl font-bold text-purple-400 mt-3">
            {dashboard.review_statistics.total_reviews}
          </p>

        </div>

      </div>


      {/* ================= AI REVIEW STATISTICS ================= */}

      <h2 className="text-3xl font-bold text-white mb-6">
        AI Review Statistics
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">


        {/* Total Reviews */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h3 className="text-slate-400">
            Total Reviews
          </h3>

          <p className="text-4xl font-bold text-purple-400 mt-3">
            {dashboard.review_statistics.total_reviews}
          </p>

        </div>


        {/* Average Score */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h3 className="text-slate-400">
            Average Score
          </h3>

          <p className="text-4xl font-bold text-green-400 mt-3">
            {dashboard.review_statistics.average_score}
            <span className="text-lg text-slate-500">
              /100
            </span>
          </p>

        </div>


        {/* Bugs */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h3 className="text-slate-400">
            Bugs Found
          </h3>

          <p className="text-4xl font-bold text-red-400 mt-3">
            {dashboard.review_statistics.bugs}
          </p>

        </div>


        {/* Security */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h3 className="text-slate-400">
            Security Issues
          </h3>

          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {dashboard.review_statistics.security}
          </p>

        </div>


        {/* Performance */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h3 className="text-slate-400">
            Performance Issues
          </h3>

          <p className="text-4xl font-bold text-orange-400 mt-3">
            {dashboard.review_statistics.performance}
          </p>

        </div>

      </div>


      {/* ================= LATEST REPOSITORIES & REVIEWS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">


        {/* Latest Repositories */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-2xl font-bold text-white mb-5">
            Latest Repositories
          </h2>

          {dashboard.latest_repositories.length === 0 ? (

            <p className="text-slate-400">
              No repositories found.
            </p>

          ) : (

            dashboard.latest_repositories.map((repo, index) => (

              <div
                key={index}
                className="border-b border-slate-700 py-3"
              >

                <p className="text-white font-semibold">
                  {repo.name}
                </p>

                <p className="text-slate-400 text-sm">
                  {repo.owner}
                </p>

              </div>

            ))

          )}

        </div>


        {/* Latest AI Reviews */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-2xl font-bold text-white mb-5">
            Latest AI Reviews
          </h2>

          {dashboard.latest_reviews.length === 0 ? (

            <p className="text-slate-400">
              No reviews available.
            </p>

          ) : (

            dashboard.latest_reviews.map((review, index) => (

              <div
                key={index}
                className="border-b border-slate-700 py-3 flex justify-between"
              >

                <div>

                  <p className="text-white">
                    {review.repository}
                  </p>

                </div>

                <span className="text-green-400 font-bold">
                  {review.score}/100
                </span>

              </div>

            ))

          )}

        </div>

      </div>


      {/* ================= QUICK ACTIONS ================= */}

      <h2 className="text-2xl font-bold text-white mb-6">
        Quick Actions
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


        {/* Repositories */}

        <Link
          to="/repositories"
          className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition"
        >

          <h3 className="text-xl text-blue-400 font-bold">
            📦 Repositories
          </h3>

          <p className="text-slate-400 mt-3">
            Browse repositories
          </p>

        </Link>


        {/* Pull Requests */}

        <Link
          to="/pullrequests"
          className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-yellow-500 transition"
        >

          <h3 className="text-xl text-yellow-400 font-bold">
            🔀 Pull Requests
          </h3>

          <p className="text-slate-400 mt-3">
            View open pull requests
          </p>

        </Link>


        {/* AI Review */}

        <Link
          to="/review"
          className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition"
        >

          <h3 className="text-xl text-purple-400 font-bold">
            🤖 AI Review
          </h3>

          <p className="text-slate-400 mt-3">
            Analyze your code
          </p>

        </Link>


        {/* Analytics */}

        <Link
          to="/analytics"
          className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition"
        >

          <h3 className="text-xl text-green-400 font-bold">
            📊 Analytics
          </h3>

          <p className="text-slate-400 mt-3">
            View GitHub insights
          </p>

        </Link>

      </div>

    </div>
  );
}

export default Dashboard;