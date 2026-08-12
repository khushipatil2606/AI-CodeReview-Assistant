function Settings() {
  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">

        {/* Theme */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Theme</h2>
          <p className="text-slate-400 mb-4">
            Choose your preferred application theme.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
            🌙 Dark Mode
          </button>
        </div>

        {/* GitHub */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">
            GitHub Connection
          </h2>

          <p className="text-green-400">
            ✅ Connected
          </p>
        </div>

        {/* Gemini */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">
            Gemini API
          </h2>

          <p className="text-green-400">
            ✅ API Key Configured
          </p>
        </div>

        {/* Export */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">
            Export Reports
          </h2>

          <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg">
            Export as PDF
          </button>
        </div>

        {/* History */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">
            Review History
          </h2>

          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg">
            Clear History
          </button>
        </div>

      </div>
    </div>
  );
}

export default Settings;