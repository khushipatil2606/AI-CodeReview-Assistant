import { useEffect, useState } from "react";
import { getAIReview } from "../../services/review";
import { exportReviewPDF } from "../../utils/pdfExport";

interface ReviewData {
  score: number;
  bugs: string[];
  security: string[];
  performance: string[];
  summary: string;
}

function Review() {
  const [review, setReview] = useState<ReviewData | null>(null);

  useEffect(() => {
    getAIReview().then(setReview);
  }, []);

  if (!review) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h1 className="text-2xl font-bold text-white">
          Loading AI Review...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-white">
          AI Code Review
        </h1>

        <button
          onClick={() => exportReviewPDF(review)}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg text-white font-semibold transition"
        >
          📄 Export PDF
        </button>

      </div>

      {/* Score Card */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 mb-8">

        <h2 className="text-slate-400 text-xl">
          Overall Code Quality
        </h2>

        <div className="mt-4 flex items-center gap-4">

          <div className="text-6xl font-bold text-green-400">
            {review.score}
          </div>

          <div className="text-3xl text-white">
            /100
          </div>

        </div>

      </div>

      {/* Review Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bugs */}

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-red-400 mb-4">
            🐞 Bugs
          </h2>

          <ul className="space-y-3">

            {review.bugs.map((bug, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {bug}
              </li>
            ))}

          </ul>

        </div>

        {/* Security */}

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            🔒 Security
          </h2>

          <ul className="space-y-3">

            {review.security.map((item, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {item}
              </li>
            ))}

          </ul>

        </div>

        {/* Performance */}

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-green-400 mb-4">
            ⚡ Performance
          </h2>

          <ul className="space-y-3">

            {review.performance.map((item, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 bg-slate-900 border border-slate-700 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          📄 Summary
        </h2>

        <p className="text-slate-300 leading-8">
          {review.summary}
        </p>

      </div>

    </div>
  );
}

export default Review;