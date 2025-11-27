export default function Leaderboard() {
  const users = [
    { rank: 1, name: "Jenny Wilson", score: "94%", img: "https://i.pravatar.cc/150?img=8" },
    { rank: 2, name: "Robert Fox", score: "89%", img: "https://i.pravatar.cc/150?img=3" },
    { rank: 3, name: "Mariam Ahmed", score: "82%", img: "https://i.pravatar.cc/150?img=5" },
    { rank: 4, name: "Ali Hassan", score: "76%", img: "https://i.pravatar.cc/150?img=12" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">Leaderboard</h3>
        <button className="text-sm text-indigo-600 font-medium hover:underline">See All</button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
          >
            {/* Left user info */}
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 font-semibold text-gray-700 text-sm">
                {user.rank}
              </span>

              <img
                src={user.img}
                alt={user.name}
                className="w-9 h-9 rounded-full border"
              />

              <span className="font-medium text-gray-700">{user.name}</span>
            </div>

            {/* Right score */}
            <span className="text-sm font-semibold text-green-600">{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
