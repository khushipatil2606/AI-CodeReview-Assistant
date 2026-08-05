import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">

      <h1 className="text-8xl font-bold text-red-500">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-slate-400 mt-3">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}

export default NotFound;