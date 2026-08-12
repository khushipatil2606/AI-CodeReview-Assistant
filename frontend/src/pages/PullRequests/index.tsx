import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPullRequests } from "../../services/github";

interface PullRequest {
  number: number;
  title: string;
  state: string;
  author: string;
  created_at?: string;
  url: string;
}

function PullRequests() {
  const navigate = useNavigate();

  const owner = "khushipatil2606";
  const repo = "AI-CodeReview-Assistant";

  const [pulls, setPulls] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPullRequests() {
      try {
        setLoading(true);

        const data = await getPullRequests(owner, repo);

        console.log("Pull Requests:", data);

        if (!Array.isArray(data)) {
          setError("No Pull Requests Found.");
          setPulls([]);
          return;
        }

        setPulls(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to fetch Pull Requests.");
      } finally {
        setLoading(false);
      }
    }

    loadPullRequests();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-slate-950 min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-8">
          Pull Requests
        </h1>

        <p className="text-xl">
          Loading Pull Requests...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        Pull Requests
      </h1>

      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {pulls.length === 0 ? (
        <div className="text-slate-400 text-xl">
          No Pull Requests Found
        </div>
      ) : (
        <div className="space-y-6">

          {pulls.map((pr) => (

            <div
              key={pr.number}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6"
            >

              <h2 className="text-2xl font-bold text-white">
                PR #{pr.number}
              </h2>

              <p className="text-slate-300 mt-2">
                {pr.title}
              </p>

              <p className="text-slate-400 mt-2">
                Author: {pr.author}
              </p>

              {pr.created_at && (
                <p className="text-slate-500 text-sm mt-1">
                  Created: {pr.created_at}
                </p>
              )}

              <p
                className={`mt-3 font-semibold ${
                  pr.state === "open"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {pr.state.toUpperCase()}
              </p>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() =>
                    navigate(
                      `/review?owner=${owner}&repo=${repo}&pr=${pr.number}`
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
                >
                  🤖 AI Review
                </button>

                <a
                  href={pr.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg text-white"
                >
                  View on GitHub
                </a>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default PullRequests;