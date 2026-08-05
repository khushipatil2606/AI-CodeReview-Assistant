import { githubLogin } from "../../services/auth";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">

      <div className="bg-slate-900 p-10 rounded-xl shadow-xl w-[420px]">

        <h1 className="text-4xl font-bold text-white text-center">
          AI Code Review Assistant
        </h1>

        <p className="text-slate-400 mt-4 text-center">
          Review GitHub Pull Requests using AI
        </p>

        <button
          onClick={githubLogin}
          className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login with GitHub
        </button>

      </div>

    </div>
  );
}

export default Login;