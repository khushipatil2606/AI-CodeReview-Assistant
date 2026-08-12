import { useState } from "react";
import { analyzeSecurity } from "../../services/security";

interface SecurityData {
  score: number;
  critical: string[];
  high: string[];
  medium: string[];
  low: string[];
  recommendations: string[];
  summary: string;
}

export default function Security() {
  const [security, setSecurity] = useState<SecurityData | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [owner, setOwner] = useState("khushipatil2606");

  const [repo, setRepo] = useState("AI-CodeReview-Assistant");

  const analyze = () => {
    if (!owner.trim() || !repo.trim()) {
      setError("Please enter both GitHub owner and repository name.");
      return;
    }

    setLoading(true);
    setError("");
    setSecurity(null);

    analyzeSecurity(owner.trim(), repo.trim())
      .then((data) => {
        setSecurity(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Unable to analyze security. Please check the repository name and try again."
        );
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Header */}

      <h1 className="text-4xl font-bold text-white mb-2">
        🔐 AI Security Analysis
      </h1>

      <p className="text-slate-400 mb-8">
        AI-powered security analysis of your GitHub repository.
      </p>

      {/* Repository Selection */}

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-5">
          Repository
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Owner */}

          <div>
            <label className="block text-slate-300 mb-2">
              GitHub Owner
            </label>

            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="e.g. khushipatil2606"
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Repository */}

          <div>
            <label className="block text-slate-300 mb-2">
              Repository Name
            </label>

            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="e.g. AI-CodeReview-Assistant"
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Analyze Button */}

        <button
          onClick={analyze}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold px-6 py-3 rounded-lg transition"
        >
          {loading
            ? "🔍 Analyzing..."
            : "🔐 Analyze Security"}
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-900/30 border border-red-600 text-red-300 rounded-xl p-5 mb-8">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">
          <p className="text-blue-400 text-xl">
            🔍 Analyzing repository security...
          </p>

          <p className="text-slate-400 mt-2">
            AI is checking your repository for security vulnerabilities.
          </p>
        </div>
      )}

      {/* Results */}

      {security && !loading && (
        <>

          {/* Security Score */}

          <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold text-white mb-4">
              Security Score
            </h2>

            <p className="text-6xl font-bold text-red-400">
              {security.score}

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

              {security.critical.length === 0 ? (
                <p className="text-slate-400">
                  No critical issues.
                </p>
              ) : (
                security.critical.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3 leading-6"
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

              {security.high.length === 0 ? (
                <p className="text-slate-400">
                  No high issues.
                </p>
              ) : (
                security.high.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3 leading-6"
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

              {security.medium.length === 0 ? (
                <p className="text-slate-400">
                  No medium issues.
                </p>
              ) : (
                security.medium.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3 leading-6"
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

              {security.low.length === 0 ? (
                <p className="text-slate-400">
                  No low issues.
                </p>
              ) : (
                security.low.map((issue, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3 leading-6"
                  >
                    • {issue}
                  </p>
                ))
              )}

            </div>

          </div>

          {/* Recommendations */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold text-green-400 mb-5">
              💡 Recommendations
            </h2>

            {security.recommendations.length === 0 ? (
              <p className="text-slate-400">
                No recommendations available.
              </p>
            ) : (
              security.recommendations.map(
                (recommendation, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3 leading-6"
                  >
                    • {recommendation}
                  </p>
                )
              )
            )}

          </div>

          {/* Summary */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              📋 Summary
            </h2>

            <p className="text-slate-300 leading-7">
              {security.summary}
            </p>

          </div>

        </>
      )}

    </div>
  );
}