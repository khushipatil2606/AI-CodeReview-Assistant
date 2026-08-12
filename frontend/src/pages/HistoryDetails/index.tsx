import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Review {
  id: number;
  repository: string;
  score: number;
  bugs: string;
  security: string;
  performance: string;
  summary: string;
  created_at: string;
}

export default function HistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReview() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/review/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch review details");
        }

        const data = await response.json();

        setReview(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to load review.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadReview();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading review details...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="bg-red-900 border border-red-700 rounded-xl p-6">
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-slate-400 text-xl">
        Review not found.
      </div>
    );
  }

  const bugs = review.bugs
    ? review.bugs.split("\n").filter(Boolean)
    : [];

  const security = review.security
    ? review.security.split("\n").filter(Boolean)
    : [];

  const performance = review.performance
    ? review.performance.split("\n").filter(Boolean)
    : [];

  return (
    <div>

      {/* Back button */}
      <button
        onClick={() => navigate("/history")}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg text-white"
      >
        ← Back to History
      </button>

      {/* Title */}
      <div className="flex justify-between items-start mb-8">

        <div>
          <p className="text-slate-500 mb-2">
            Review #{review.id}
          </p>

          <h1 className="text-4xl font-bold text-white">
            Review Details
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            {review.repository}
          </p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold text-green-400">
            {review.score}
          </p>

          <p className="text-slate-400">
            / 100
          </p>
        </div>

      </div>

      {/* Summary */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">

        <h2 className="text-blue-400 text-2xl font-semibold mb-4">
          📄 Summary
        </h2>

        <p className="text-slate-300 leading-8">
          {review.summary}
        </p>

      </div>

      {/* Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bugs */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

          <h2 className="text-red-400 text-2xl font-semibold mb-4">
            🐞 Bugs
          </h2>

          {bugs.length > 0 ? (
            <div className="space-y-3">
              {bugs.map((bug, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-lg p-3"
                >
                  <p className="text-slate-300">
                    • {bug}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No bugs found.
            </p>
          )}

        </div>

        {/* Security */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

          <h2 className="text-yellow-400 text-2xl font-semibold mb-4">
            🔒 Security
          </h2>

          {security.length > 0 ? (
            <div className="space-y-3">
              {security.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-lg p-3"
                >
                  <p className="text-slate-300">
                    • {item}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No security issues found.
            </p>
          )}

        </div>

        {/* Performance */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

          <h2 className="text-green-400 text-2xl font-semibold mb-4">
            ⚡ Performance
          </h2>

          {performance.length > 0 ? (
            <div className="space-y-3">
              {performance.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-lg p-3"
                >
                  <p className="text-slate-300">
                    • {item}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No performance suggestions.
            </p>
          )}

        </div>

      </div>

      {/* Date */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 mt-6">

        <p className="text-slate-400">
          🕒 Reviewed on{" "}
          <span className="text-slate-200">
            {new Date(review.created_at).toLocaleString()}
          </span>
        </p>

      </div>

    </div>
  );
}