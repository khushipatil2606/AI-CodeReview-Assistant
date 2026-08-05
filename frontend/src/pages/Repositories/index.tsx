import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Repository {
  name: string;
  owner: string;
  language: string;
  stars: number;
  private: boolean;
  url: string;
}

function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/github/repositories")
      .then((res) => res.json())
      .then((data) => setRepositories(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-950 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Repositories
          </h1>

          <p className="text-slate-400 mt-2">
            {filteredRepositories.length} of {repositories.length} repositories
          </p>
        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4 mb-8 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {filteredRepositories.map((repo) => (

          <div
            key={repo.name}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
          >

            <div className="flex justify-between items-start">

              <h2 className="text-2xl font-bold text-white break-all">
                {repo.name}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  repo.private
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {repo.private ? "🔒 Private" : "🌍 Public"}
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <p className="text-slate-300">
                👤 <span className="font-semibold">Owner:</span>{" "}
                {repo.owner}
              </p>

              <p className="text-slate-300">
                💻 <span className="font-semibold">Language:</span>{" "}
                {repo.language || "Not Specified"}
              </p>

              <p className="text-yellow-400 font-semibold">
                ⭐ {repo.stars} Stars
              </p>

            </div>

            <Link
                to={`/repository/${repo.owner}/${repo.name}`}
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold transition"
            >
                View Details →
            </Link>

          </div>

        ))}

      </div>

      {filteredRepositories.length === 0 && (

        <div className="text-center mt-20">

          <h2 className="text-2xl font-bold text-slate-300">
            No Repository Found
          </h2>

          <p className="text-slate-500 mt-3">
            Try searching with another repository name.
          </p>

        </div>

      )}

    </div>
  );
}

export default Repositories;