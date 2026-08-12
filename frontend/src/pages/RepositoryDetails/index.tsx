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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepository() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/github/repository/${owner}/${repo}`
        );

        const data = await response.json();

        setRepository(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRepository();
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="text-white p-10 text-2xl">
        Loading Repository...
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="text-red-400 p-10 text-2xl">
        Repository not found.
      </div>
    );
  }

  return (
    <div className="p-10 bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold text-white mb-8">
        {repository.name}
      </h1>

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-8 space-y-5">

        <p className="text-slate-300">
          👤 <b>Owner:</b> {repository.owner}
        </p>

        <p className="text-slate-300">
          📝 <b>Description:</b>{" "}
          {repository.description || "No description available"}
        </p>

        <p className="text-slate-300">
          💻 <b>Language:</b>{" "}
          {repository.language || "Not specified"}
        </p>

        <p className="text-yellow-400">
          ⭐ <b>Stars:</b> {repository.stars}
        </p>

        <p className="text-blue-400">
          🍴 <b>Forks:</b> {repository.forks}
        </p>

        <p className="text-green-400">
          👀 <b>Watchers:</b> {repository.watchers}
        </p>

        <p className="text-red-400">
          🐞 <b>Open Issues:</b> {repository.issues}
        </p>

        <p className="text-purple-400">
          🌿 <b>Default Branch:</b> {repository.branch}
        </p>

        <p className="text-slate-400">
          🔄 <b>Last Updated:</b> {repository.updated}
        </p>

        <div className="flex flex-wrap gap-4 pt-6">

          <a
            href={repository.url}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white"
          >
            Open on GitHub
          </a>

          <Link
            to={`/commits/${repository.owner}/${repository.name}`}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white"
          >
            View Commits
          </Link>

          <Link
            to={`/pullrequests?owner=${repository.owner}&repo=${repository.name}`}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg text-white"
          >
            View Pull Requests
          </Link>

        </div>

      </div>

    </div>
  );
}