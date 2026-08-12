import { useState } from "react";
import { analyzeArchitecture } from "../../services/architecture";

interface ArchitectureData {
  score: number;
  strengths: string[];
  issues: string[];
  recommendations: string[];
  summary: string;
}

export default function Architecture() {
  const [owner, setOwner] = useState("khushipatil2606");
  const [repo, setRepo] = useState("AI-CodeReview-Assistant");

  const [architecture, setArchitecture] =
    useState<ArchitectureData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await analyzeArchitecture(owner, repo);
      setArchitecture(data);
    } catch (err) {
      console.error(err);
      setError("Unable to analyze architecture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">

      {/* Header */}

      <h1 className="text-4xl font-bold mb-2">
        🏗️ AI Architecture Analysis
      </h1>

      <p className="text-slate-400 mb-8">
        AI-powered analysis of your GitHub repository architecture.
      </p>

      {/* Repository */}

      <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Repository
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-slate-300 mb-2">
              GitHub Owner
            </label>

            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Repository Name
            </label>

            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-white"
            />
          </div>

        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-6 py-3 rounded-lg font-bold transition"
        >
          {loading
            ? "🏗️ Analyzing..."
            : "🏗️ Analyze Architecture"}
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-900/30 border border-red-600 text-red-300 rounded-xl p-5 mb-8">
          {error}
        </div>
      )}

      {/* Results */}

      {architecture && (
        <>

          {/* Score */}

          <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Architecture Score
            </h2>

            <p className="text-6xl font-bold text-blue-400">
              {architecture.score}
              <span className="text-2xl text-slate-400">
                /100
              </span>
            </p>

          </div>

          {/* Strengths & Issues */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Strengths */}

            <div className="bg-slate-900 rounded-xl p-6 border border-green-700">

              <h2 className="text-2xl font-bold text-green-400 mb-5">
                🟢 Strengths
              </h2>

              {architecture.strengths.length === 0 ? (
                <p className="text-slate-400">
                  No strengths identified.
                </p>
              ) : (
                architecture.strengths.map((item, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {item}
                  </p>
                ))
              )}

            </div>

            {/* Issues */}

            <div className="bg-slate-900 rounded-xl p-6 border border-red-700">

              <h2 className="text-2xl font-bold text-red-400 mb-5">
                🔴 Issues
              </h2>

              {architecture.issues.length === 0 ? (
                <p className="text-slate-400">
                  No architecture issues found.
                </p>
              ) : (
                architecture.issues.map((item, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {item}
                  </p>
                ))
              )}

            </div>

          </div>

          {/* Recommendations */}

          <div className="bg-slate-900 rounded-xl p-6 border border-yellow-700 mb-8">

            <h2 className="text-2xl font-bold text-yellow-400 mb-5">
              💡 Recommendations
            </h2>

            {architecture.recommendations.length === 0 ? (
              <p className="text-slate-400">
                No recommendations available.
              </p>
            ) : (
              architecture.recommendations.map(
                (item, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {item}
                  </p>
                )
              )
            )}

          </div>

          {/* Summary */}

          <div className="bg-slate-900 rounded-xl p-6 border border-purple-700">

            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              📋 Summary
            </h2>

            <p className="text-slate-300 leading-7">
              {architecture.summary}
            </p>

          </div>

        </>
      )}

    </div>
  );
}