import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import RepositoryDetails from "./pages/RepositoryDetails";
import PullRequests from "./pages/PullRequests";
import Review from "./pages/Review";
import Analytics from "./pages/Analytics";
import Architecture from "./pages/Architecture";
import Commits from "./pages/Commits";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dependency from "./pages/Dependency";
import Security from "./pages/Security";
import Quality from "./pages/Quality";
import Explain from "./pages/Explain";
import HistoryDetails from "./pages/HistoryDetails";
import BugFix from "./pages/BugFix";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Main Layout */}
      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/repositories"
          element={<Repositories />}
        />
        <Route
          path="/quality"
          element={<Quality />}
        />
        <Route
          path="/repository/:owner/:repo"
          element={<RepositoryDetails />}
        />
        <Route
          path="/security"
          element={<Security />}
        />
        <Route
          path="/commits/:owner/:repo"
          element={<Commits />}
        />
        <Route path="/bugfix" element={<BugFix />} />
        <Route
          path="/explain"
          element={<Explain />}
        />
        <Route
          path="/pullrequests"
          element={<PullRequests />}
        />
        <Route
          path="/dependency"
          element={<Dependency />}
        />
        <Route
          path="/review"
          element={<Review />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/architecture"
          element={<Architecture />}
        />

        <Route
          path="/history"
          element={<History />}
        />
        <Route path="/history/:id" element={<HistoryDetails />} />
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;