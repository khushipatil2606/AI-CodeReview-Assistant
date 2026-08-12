import { useEffect, useState } from "react";
import {
  getRepositoryFiles,
  explainFile,
} from "../../services/explain";

interface ExplainData {
  summary: string;
  purpose: string;
  flow: string[];
  complexity: string;
  improvements: string[];
}

export default function Explain() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [explanation, setExplanation] =
    useState<ExplainData | null>(null);

  const [loadingFiles, setLoadingFiles] = useState(true);
  const [loadingExplanation, setLoadingExplanation] =
    useState(false);

  const [error, setError] = useState("");

  const owner = "khushipatil2606";
  const repo = "AI-CodeReview-Assistant";

  useEffect(() => {
    getRepositoryFiles(owner, repo)
      .then((data) => {
        setFiles(data);

        if (data.length > 0) {
          setSelectedFile(data[0]);
        }

        setLoadingFiles(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load repository files.");
        setLoadingFiles(false);
      });
  }, []);

  const handleExplain = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setError("");
    setExplanation(null);
    setLoadingExplanation(true);

    try {
      const data = await explainFile(
        owner,
        repo,
        selectedFile
      );

      if (data.error) {
        setError(data.error);
      } else {
        setExplanation(data);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to explain the selected file.");
    } finally {
      setLoadingExplanation(false);
    }
  };

  if (loadingFiles) {
    return (
      <div className="p-8 text-white text-xl">
        🤖 Loading repository files...
      </div>
    );
  }

  return (
    <div className="p-8 text-white">

      {/* Header */}

      <h1 className="text-4xl font-bold mb-3">
        🤖 AI Code Explain
      </h1>

      <p className="text-slate-400 mb-8">
        Select a GitHub file and let AI explain how it works.
      </p>

      {/* File Selection */}

      <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Select Repository File
        </h2>

        <label className="block text-slate-300 mb-2">
          File
        </label>

        <select
          value={selectedFile}
          onChange={(e) =>
            setSelectedFile(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-white mb-6"
        >
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>

        <button
          onClick={handleExplain}
          disabled={loadingExplanation || !selectedFile}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-6 py-3 rounded-lg font-bold"
        >
          {loadingExplanation
            ? "🤖 Analyzing..."
            : "🤖 Explain File"}
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-5 mb-8">
          <p className="text-red-400">
            ❌ {error}
          </p>
        </div>
      )}

      {/* Explanation */}

      {explanation && (
        <div className="space-y-6">

          {/* Summary */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              📋 Summary
            </h2>

            <p className="text-slate-300 leading-7">
              {explanation.summary}
            </p>
          </div>

          {/* Purpose */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              🎯 Purpose
            </h2>

            <p className="text-slate-300 leading-7">
              {explanation.purpose}
            </p>
          </div>

          {/* Flow */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold text-green-400 mb-5">
              🔄 Execution Flow
            </h2>

            <div className="space-y-4">

              {explanation.flow.map(
                (step, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <p className="text-slate-300 pt-1">
                      {step}
                    </p>
                  </div>
                )
              )}

            </div>

          </div>

          {/* Complexity */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              ⚡ Complexity
            </h2>

            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-lg font-bold">
              {explanation.complexity}
            </span>

          </div>

          {/* Improvements */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold text-orange-400 mb-5">
              💡 Improvements
            </h2>

            {explanation.improvements.length === 0 ? (
              <p className="text-slate-400">
                No improvements suggested.
              </p>
            ) : (
              explanation.improvements.map(
                (improvement, index) => (
                  <p
                    key={index}
                    className="text-slate-300 mb-3"
                  >
                    • {improvement}
                  </p>
                )
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}