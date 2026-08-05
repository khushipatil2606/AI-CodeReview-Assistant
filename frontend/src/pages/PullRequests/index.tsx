import { useEffect, useState } from "react";
import { getPullRequests } from "../../services/github";

function PullRequests() {
  const [pulls, setPulls] = useState<any[]>([]);

  useEffect(() => {
    getPullRequests("khushipatil2606", "AI-StudyMate")
      .then((data) => setPulls(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Pull Requests
      </h1>

      {pulls.length === 0 ? (
        <div className="text-gray-400">
          No Pull Requests Found
        </div>
      ) : (
        pulls.map((pr) => (
          <div
            key={pr.number}
            className="bg-slate-900 border border-slate-700 rounded-xl p-5 mb-4"
          >
            <h2 className="text-xl font-bold">
              {pr.title}
            </h2>

            <p>Author: {pr.author}</p>

            <p>Status: {pr.state}</p>

            <a
              href={pr.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              View on GitHub
            </a>
          </div>
        ))
      )}

    </div>
  );
}

export default PullRequests;