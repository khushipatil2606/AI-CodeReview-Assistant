
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReviewHistory } from "../../services/review";

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

export default function History() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewHistory()
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("History error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading review history...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-3">
        Review History
      </h1>

      <p className="text-slate-400 text-lg mb-8">
        View your previous AI code review results.
      </p>

      {reviews.length === 0 ? (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
          <p className="text-slate-400 text-xl">
            No reviews found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition"
            >

              {/* Header */}
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-slate-500 mb-1">
                    Review #{review.id}
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    {review.repository}
                  </h2>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-bold text-green-400">
                    {review.score}
                  </p>

                  <p className="text-slate-400">
                    / 100
                  </p>
                </div>

              </div>

              <div className="border-t border-slate-700 my-5" />

              {/* Summary */}
              <div>

                <h3 className="text-blue-400 text-xl font-semibold mb-2">
                  📄 Summary
                </h3>

                <p className="text-slate-300 leading-7">
                  {review.summary}
                </p>

              </div>

              {/* Issue cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                {/* Bugs */}
                <div className="bg-slate-800 rounded-lg p-4">

                  <h3 className="text-red-400 font-semibold text-lg">
                    🐞 Bugs
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {review.bugs
                      ? review.bugs.split("\n").filter(Boolean).length
                      : 0}{" "}
                    issue(s)
                  </p>

                </div>

                {/* Security */}
                <div className="bg-slate-800 rounded-lg p-4">

                  <h3 className="text-yellow-400 font-semibold text-lg">
                    🔒 Security
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {review.security
                      ? review.security.split("\n").filter(Boolean).length
                      : 0}{" "}
                    issue(s)
                  </p>

                </div>

                {/* Performance */}
                <div className="bg-slate-800 rounded-lg p-4">

                  <h3 className="text-green-400 font-semibold text-lg">
                    ⚡ Performance
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {review.performance
                      ? review.performance.split("\n").filter(Boolean).length
                      : 0}{" "}
                    issue(s)
                  </p>

                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6">

                <p className="text-slate-500">
                  🕒 Reviewed on{" "}
                  {new Date(review.created_at).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    navigate(`/history/${review.id}`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-semibold transition"
                >
                  View Details →
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}