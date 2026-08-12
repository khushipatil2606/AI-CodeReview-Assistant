import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getAIReview } from "../../services/review";
import { exportReviewPDF } from "../../services/pdfExport";
import { exportReviewDOCX } from "../../services/docxExport";

interface ReviewData {
  score: number;
  bugs?: string[];
  security?: string[];
  performance?: string[];
  summary: string;
}

function Review() {
  const [searchParams] = useSearchParams();

  const owner =
    searchParams.get("owner") || "khushipatil2606";

  const [repo, setRepo] = useState(
    searchParams.get("repo") || "AI-CodeReview-Assistant"
  );

  const [prNumber, setPrNumber] = useState(
    Number(searchParams.get("pr")) || 1
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [review, setReview] =
    useState<ReviewData | null>(null);

  const generateReview = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAIReview(
        owner,
        repo,
        prNumber
      );

      if (data.error) {
        setError(data.error);
        return;
      }

      setReview({
        score: data.score ?? 0,
        bugs: data.bugs ?? [],
        security: data.security ?? [],
        performance: data.performance ?? [],
        summary:
          data.summary ?? "No summary available.",
      });
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Unable to generate AI Review."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      searchParams.get("owner") &&
      searchParams.get("repo") &&
      searchParams.get("pr")
    ) {
      generateReview();
    }
  }, []);

  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      {/* Header */}

      <h1 className="text-4xl font-bold text-white mb-8">
        AI Code Review
      </h1>

      {/* Repository Inputs */}

      <div className="bg-slate-900 p-6 rounded-xl mb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            value={owner}
            disabled
            className="p-3 rounded bg-slate-800 text-gray-400 border border-slate-700"
          />

          <input
            value={repo}
            onChange={(e) =>
              setRepo(e.target.value)
            }
            className="p-3 rounded bg-slate-800 text-white border border-slate-700"
            placeholder="Repository"
          />

          <input
            type="number"
            value={prNumber}
            onChange={(e) =>
              setPrNumber(Number(e.target.value))
            }
            className="p-3 rounded bg-slate-800 text-white border border-slate-700"
            placeholder="PR Number"
          />

        </div>

        <button
          onClick={generateReview}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 px-6 py-3 rounded-lg text-white font-semibold"
        >
          {loading
            ? "Generating..."
            : "Generate AI Review"}
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
          <p className="text-red-200">
            {error}
          </p>
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div className="text-center text-white text-xl mb-8">
          🤖 AI is reviewing the Pull Request...
        </div>
      )}

      {/* Review Result */}

      {review && !loading && (
        <>

          {/* Score + Export Buttons */}

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">

            <div>
              <p className="text-slate-400 text-lg mb-2">
                AI Review Score
              </p>

              <div className="text-6xl font-bold text-green-400">
                {review.score}/100
              </div>
            </div>

            {/* Export Buttons */}

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() => {
                  try {
                    exportReviewPDF(review);
                  } catch (error) {
                    console.error(
                      "PDF export error:",
                      error
                    );
                  }
                }}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition"
              >
                📄 Export PDF
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await exportReviewDOCX(review);
                  } catch (error) {
                    console.error(
                      "DOCX export error:",
                      error
                    );
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition"
              >
                📝 Export DOCX
              </button>

            </div>

          </div>

          {/* Analysis Cards */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Bugs */}

            <div className="bg-slate-900 rounded-xl p-6 border border-red-900">

              <h2 className="text-red-400 text-2xl mb-4">
                🐞 Bugs
              </h2>

              {review.bugs &&
              review.bugs.length > 0 ? (
                review.bugs.map(
                  (bug, index) => (
                    <p
                      key={index}
                      className="text-slate-300 mb-2"
                    >
                      • {bug}
                    </p>
                  )
                )
              ) : (
                <p className="text-slate-500">
                  No bugs found.
                </p>
              )}

            </div>

            {/* Security */}

            <div className="bg-slate-900 rounded-xl p-6 border border-yellow-900">

              <h2 className="text-yellow-400 text-2xl mb-4">
                🔒 Security
              </h2>

              {review.security &&
              review.security.length > 0 ? (
                review.security.map(
                  (item, index) => (
                    <p
                      key={index}
                      className="text-slate-300 mb-2"
                    >
                      • {item}
                    </p>
                  )
                )
              ) : (
                <p className="text-slate-500">
                  No security issues.
                </p>
              )}

            </div>

            {/* Performance */}

            <div className="bg-slate-900 rounded-xl p-6 border border-green-900">

              <h2 className="text-green-400 text-2xl mb-4">
                ⚡ Performance
              </h2>

              {review.performance &&
              review.performance.length > 0 ? (
                review.performance.map(
                  (item, index) => (
                    <p
                      key={index}
                      className="text-slate-300 mb-2"
                    >
                      • {item}
                    </p>
                  )
                )
              ) : (
                <p className="text-slate-500">
                  No performance suggestions.
                </p>
              )}

            </div>

          </div>

          {/* Summary */}

          <div className="bg-slate-900 rounded-xl p-6 mt-8 border border-slate-700">

            <h2 className="text-blue-400 text-2xl mb-4">
              📄 Summary
            </h2>

            <p className="text-slate-300 leading-8">
              {review.summary}
            </p>

          </div>

        </>
      )}

    </div>
  );
}

export default Review;