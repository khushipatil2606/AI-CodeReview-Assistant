const reviews = [
  {
    repo: "AI-Agent",
    status: "Completed",
    severity: "High",
    time: "2 min ago",
  },
  {
    repo: "StudyMate",
    status: "Running",
    severity: "Medium",
    time: "5 min ago",
  },
  {
    repo: "InsightGenAI",
    status: "Completed",
    severity: "Low",
    time: "12 min ago",
  },
];

function RecentReviews() {
  return (
    <div className="bg-slate-900 rounded-xl mt-8 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Reviews
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400">
            <th>Repository</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.repo}
              className="border-t border-slate-800 h-14"
            >
              <td className="text-white">{review.repo}</td>
              <td className="text-green-400">{review.status}</td>
              <td className="text-red-400">{review.severity}</td>
              <td className="text-slate-400">{review.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentReviews;