import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">

      <StatCard
        title="Repositories"
        value="12"
        color="text-blue-400"
      />

      <StatCard
        title="Open PRs"
        value="31"
        color="text-yellow-400"
      />

      <StatCard
        title="AI Reviews"
        value="148"
        color="text-green-400"
      />

      <StatCard
        title="Security Issues"
        value="9"
        color="text-red-400"
      />

    </div>
  );
}

export default StatsGrid;