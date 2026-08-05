function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-white">
        AI Code Review Assistant
      </h1>

      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
        KP
      </div>
    </header>
  );
}

export default Navbar;