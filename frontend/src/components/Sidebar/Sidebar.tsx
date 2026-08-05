import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Repositories", path: "/repositories" },
  { name: "Pull Requests", path: "/pullrequests" },
  { name: "AI Review", path: "/review" },
  { name: "Analytics", path: "/analytics" },
  { name: "Settings", path: "/settings" },
  {name: "History",path: "/history"}
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800">
      <nav className="p-5 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;