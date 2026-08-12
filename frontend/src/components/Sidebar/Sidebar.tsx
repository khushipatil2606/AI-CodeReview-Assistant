import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Repositories", path: "/repositories" },
  { name: "Pull Requests", path: "/pullrequests" },
  { name: "AI Review", path: "/review" },
  { name: "Analytics", path: "/analytics" },
  { name: "Architecture", path: "/architecture" },
  { name: "Dependency", path: "/dependency" },
  { name: "Settings", path: "/settings" },
  { name: "History", path: "/history" },
  { name: "Profile", path: "/profile" },
  { name: "Code Quality", path: "/quality" },
  { name: "AI Explain", path: "/explain" },
  { name: "Bug Fix", path: "/bugfix" },
  { name: "Security", path: "/security" },
];

function Sidebar() {
  return (
    <div className="space-y-2">
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
    </div>
  );
}

export default Sidebar;