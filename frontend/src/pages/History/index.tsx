import { useEffect, useState } from "react";
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
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviewHistory()
      .then(setReviews)
      .catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Review History
      </h1>

      {reviews.length === 0 ? (
        <div className="text-slate-400 text-xl">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white">
                {review.repository}
              </h2>

              <p className="text-green-400 mt-2">
                ⭐ Score: {review.score}/100
              </p>

              <p className="text-slate-300 mt-2">
                <strong>Summary:</strong> {review.summary}
              </p>

              <p className="text-slate-400 mt-2">
                Reviewed On:{" "}
                {new Date(review.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}