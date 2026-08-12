import { useState } from "react";
import { analyzeDependencies } from "../../services/dependency";

interface DependencyData {
  score: number;
  critical: string[];
  high: string[];
  medium: string[];
  low: string[];
  outdated: string[];
  recommendations: string[];
  summary: string;
}

export default function Dependency() {
  const [owner, setOwner] = useState("khushipatil2606");
  const [repo, setRepo] = useState("AI-CodeReview-Assistant");

  const [dependency, setDependency] =
    useState<DependencyData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await analyzeDependencies(owner, repo);

      setDependency(data);
    } catch (err) {
      console.error(err);
      setError("Unable to analyze dependencies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">

      {/* Header */}

      <h1 className="text-4xl font-bold text-white mb-2">
        📦 AI Dependency Analysis
      </h1>

      <p className="text-slate-400 mb-8">
        AI-powered analysis of your GitHub repository dependencies.
      </p>

      {/* Repository */}

      <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Repository
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-slate-300 mb-2">
              GitHub Owner
            </label>

            <input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white"
              placeholder="GitHub username"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Repository Name
            </label>

            <input
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white"
              placeholder="Repository name"
            />
          </div>

        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold px-6 py-3 rounded-lg transition"
        >
          {loading
            ? "🔄 Analyzing..."
            : "📦 Analyze Dependencies"}
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-5 mb-8">
          {error}
        </div>
      )}

      {/* Results */}

      {dependency && !loading && (
        <>
          {/* Score */}

          <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold text-white mb-4">
              Dependency Score
            </h2>

            <p className="text-6xl font-bold text-blue-400">
              {dependency.score}
              <span className="text-2xl text-slate-400">
                /100
              </span>
            </p>

          </div>

          {/* Issues */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Critical */}

            <div className="bg-slate-900 rounded-xl p-6 border border-red-700">

              <h2 className="text-2xl font-bold text-red-400 mb-4">
                🔴 Critical
              </h2>

              {dependency.critical.length === 0 ? (
                <p className="text-slate-400">
                  No critical issues.
                </p>
              ) : (
                dependency.critical.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {issue}
                  </p>
                ))
              )}

            </div>

            {/* High */}

            <div className="bg-slate-900 rounded-xl p-6 border border-orange-700">

              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                🟠 High
              </h2>

              {dependency.high.length === 0 ? (
                <p className="text-slate-400">
                  No high issues.
                </p>
              ) : (
                dependency.high.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {issue}
                  </p>
                ))
              )}

            </div>

            {/* Medium */}

            <div className="bg-slate-900 rounded-xl p-6 border border-yellow-700">

              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                🟡 Medium
              </h2>

              {dependency.medium.length === 0 ? (
                <p className="text-slate-400">
                  No medium issues.
                </p>
              ) : (
                dependency.medium.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {issue}
                  </p>
                ))
              )}

            </div>

            {/* Low */}

            <div className="bg-slate-900 rounded-xl p-6 border border-blue-700">

              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                🔵 Low
              </h2>

              {dependency.low.length === 0 ? (
                <p className="text-slate-400">
                  No low issues.
                </p>
              ) : (
                dependency.low.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {issue}
                  </p>
                ))
              )}

            </div>

          </div>

          {/* Outdated Dependencies */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold text-yellow-400 mb-5">
              ⚠️ Outdated Dependencies
            </h2>

            {dependency.outdated.length === 0 ? (
              <p className="text-slate-400">
                No outdated dependencies detected.
              </p>
            ) : (
              dependency.outdated.map((item, index) => (
                <p
                  key={index}
                  className="text-slate-300 mb-3"
                >
                  • {item}
                </p>
              ))
            )}

          </div>

          {/* Recommendations */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold text-green-400 mb-5">
              💡 Recommendations
            </h2>

            {dependency.recommendations.length === 0 ? (
              <p className="text-slate-400">
                No recommendations available.
              </p>
            ) : (
              dependency.recommendations.map(
                (recommendation, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {recommendation}
                  </p>
                )
              )
            )}

          </div>

          {/* Summary */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              📋 Summary
            </h2>

            <p className="text-slate-300 leading-7">
              {dependency.summary}
            </p>

          </div>
        </>
      )}

    </div>
  );
}