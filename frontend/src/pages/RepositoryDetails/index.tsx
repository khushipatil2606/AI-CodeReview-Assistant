import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Repo {
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  branch: string;
  private: boolean;
  updated: string;
  url: string;
}

export default function RepositoryDetails() {
  const { owner, repo } = useParams();

  const [repository, setRepository] = useState<Repo | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/github/repository/${owner}/${repo}`)
      .then((res) => res.json())
      .then((data) => setRepository(data))
      .catch((err) => console.error(err));
  }, [owner, repo]);

  if (!repository)
    return <h1 className="text-white p-10">Loading...</h1>;

  return (
    <div className="p-10 bg-slate-950 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-white">
        {repository.name}
      </h1>

      <div className="bg-slate-900 rounded-xl p-8 space-y-4 border border-slate-700">

        <p className="text-slate-300">
          👤 <span className="font-semibold">Owner :</span> {repository.owner}
        </p>

        <p className="text-slate-300">
          📝 <span className="font-semibold">Description :</span>{" "}
          {repository.description || "No description available"}
        </p>

        <p className="text-slate-300">
          💻 <span className="font-semibold">Language :</span>{" "}
          {repository.language || "Not specified"}
        </p>

        <p className="text-yellow-400">
          ⭐ <span className="font-semibold">Stars :</span> {repository.stars}
        </p>

        <p className="text-blue-400">
          🍴 <span className="font-semibold">Forks :</span> {repository.forks}
        </p>

        <p className="text-green-400">
          👀 <span className="font-semibold">Watchers :</span> {repository.watchers}
        </p>

        <p className="text-red-400">
          🐞 <span className="font-semibold">Open Issues :</span> {repository.issues}
        </p>

        <p className="text-purple-400">
          🌿 <span className="font-semibold">Default Branch :</span>{" "}
          {repository.branch}
        </p>

        <div className="flex gap-4 mt-8">

          <a
            href={repository.url}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold transition"
          >
            Open on GitHub
          </a>

          <Link
            to={`/commits/${repository.owner}/${repository.name}`}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white font-semibold transition"
          >
            View Commits
          </Link>

        </div>

      </div>
    </div>
  );
}