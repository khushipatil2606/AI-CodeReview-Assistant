import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-2">
        AI Code Review Assistant
      </h1>

      <p className="text-slate-400 mb-10">
        Review GitHub repositories with AI-powered insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="/repositories"
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition"
        >
          <h2 className="text-2xl font-bold text-blue-400">
            📦 Repositories
          </h2>

          <p className="text-slate-400 mt-3">
            Browse your GitHub repositories.
          </p>
        </Link>

        <Link
          to="/analytics"
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-green-500 transition"
        >
          <h2 className="text-2xl font-bold text-green-400">
            📊 Analytics
          </h2>

          <p className="text-slate-400 mt-3">
            Repository statistics and charts.
          </p>
        </Link>

        <Link
          to="/review"
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition"
        >
          <h2 className="text-2xl font-bold text-purple-400">
            🤖 AI Review
          </h2>

          <p className="text-slate-400 mt-3">
            AI-powered code review dashboard.
          </p>
        </Link>

        <Link
          to="/pullrequests"
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-yellow-500 transition"
        >
          <h2 className="text-2xl font-bold text-yellow-400">
            🔀 Pull Requests
          </h2>

          <p className="text-slate-400 mt-3">
            View open pull requests.
          </p>
        </Link>

        <Link
          to="/settings"
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-red-500 transition"
        >
          <h2 className="text-2xl font-bold text-red-400">
            ⚙ Settings
          </h2>

          <p className="text-slate-400 mt-3">
            Configure your application.
          </p>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;