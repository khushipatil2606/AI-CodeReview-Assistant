import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export default function Commits() {
  const { owner, repo } = useParams();

  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/github/commits/${owner}/${repo}`)
      .then((res) => res.json())
      .then((data) => setCommits(data))
      .catch(console.error);
  }, [owner, repo]);

  return (
    <div className="p-10 bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        Commit History
      </h1>

      <div className="space-y-5">

        {commits.map((commit) => (

          <div
            key={commit.sha}
            className="bg-slate-900 rounded-xl p-6 border border-slate-700"
          >

            <h2 className="text-xl text-white font-semibold">
              {commit.message}
            </h2>

            <p className="text-slate-400 mt-2">
              👤 {commit.author}
            </p>

            <p className="text-slate-400">
              📅 {new Date(commit.date).toLocaleString()}
            </p>

            <p className="text-slate-500 text-sm mt-2">
              SHA: {commit.sha.substring(0, 7)}
            </p>

            <a
              href={commit.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
            >
              View Commit
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}