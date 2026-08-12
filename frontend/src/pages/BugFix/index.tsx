import { useState } from "react";
import { analyzeBugFixes } from "../../services/bugfix";

interface Bug {
  file?: string;
  line?: string | number;
  description?: string;
}

interface BugFixData {
  score: number;
  bugs: Bug[];
  fixes: string[];
  summary: string;
}

export default function BugFix() {
  const [owner, setOwner] = useState("khushipatil2606");
  const [repo, setRepo] = useState("AI-CodeReview-Assistant");

  const [result, setResult] = useState<BugFixData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeBugFixes(owner, repo);

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to analyze bugs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">

      {/* Header */}

      <h1 className="text-4xl font-bold mb-2">
        🐛 AI Bug Fix Assistant
      </h1>

      <p className="text-slate-400 mb-8">
        AI-powered bug detection and fix recommendations for your GitHub repository.
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
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
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
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-6 py-3 rounded-lg font-bold transition"
        >
          {loading ? "🔄 Analyzing..." : "🐛 Analyze Bugs"}
        </button>

      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 mb-8">
          <p className="text-blue-400 text-lg">
            🔍 AI is analyzing your repository for bugs...
          </p>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="bg-red-950 border border-red-700 rounded-xl p-6 mb-8">
          <p className="text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Results */}

      {result && !loading && (

        <>

          {/* Score */}

          <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Bug Fix Score
            </h2>

            <p className="text-6xl font-bold text-blue-400">
              {result.score}
              <span className="text-2xl text-slate-400">
                /100
              </span>
            </p>

          </div>

          {/* Bugs */}

          <div className="bg-slate-900 rounded-xl p-8 border border-red-700 mb-8">

            <h2 className="text-2xl font-bold text-red-400 mb-6">
              🐛 Bugs Detected
            </h2>

            {result.bugs.length === 0 ? (

              <p className="text-green-400">
                ✅ No significant bugs detected.
              </p>

            ) : (

              <div className="space-y-5">

                {result.bugs.map((bug, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 rounded-lg p-5 border border-slate-700"
                  >

                    <div className="flex flex-wrap gap-4 mb-3">

                      {bug.file && (
                        <span className="text-blue-400 font-semibold">
                          📄 {bug.file}
                        </span>
                      )}

                      {bug.line && (
                        <span className="text-yellow-400">
                          Line: {bug.line}
                        </span>
                      )}

                    </div>

                    <p className="text-slate-300">
                      {bug.description || "Bug detected by AI."}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Fixes */}

          <div className="bg-slate-900 rounded-xl p-8 border border-green-700 mb-8">

            <h2 className="text-2xl font-bold text-green-400 mb-6">
              🔧 Recommended Fixes
            </h2>

            {result.fixes.length === 0 ? (

              <p className="text-slate-400">
                No fixes available.
              </p>

            ) : (

              <div className="space-y-4">

                {result.fixes.map((fix, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 rounded-lg p-4 border border-slate-700"
                  >
                    <p className="text-slate-300">
                      <span className="text-green-400 font-bold">
                        {index + 1}.
                      </span>{" "}
                      {typeof fix === "string"
                        ? fix
                        : JSON.stringify(fix)}
                    </p>
                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Summary */}

          <div className="bg-slate-900 rounded-xl p-8 border border-purple-700 mb-8">

            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              📋 Summary
            </h2>

            <p className="text-slate-300 leading-7">
              {result.summary}
            </p>

          </div>

        </>

      )}

    </div>
  );
}