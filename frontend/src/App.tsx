import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { saveGitHubToken } from "./services/auth";

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

  const location = useLocation();
  const navigate = useNavigate();

  // ---------------- Save GitHub OAuth Token ----------------

  useEffect(() => {

    const tokenSaved = saveGitHubToken();

    if (tokenSaved) {
      navigate("/dashboard", {
        replace: true,
      });
    }

  }, [location.search, navigate]);


  return (
    <Routes>

      {/* ---------------- Login ---------------- */}

      <Route
        path="/"
        element={<Login />}
      />


      {/* ---------------- Main Layout ---------------- */}

      <Route
        element={<MainLayout />}
      >

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* Repositories */}

        <Route
          path="/repositories"
          element={<Repositories />}
        />


        {/* Repository Details */}

        <Route
          path="/repository/:owner/:repo"
          element={<RepositoryDetails />}
        />


        {/* Pull Requests */}

        <Route
          path="/pullrequests"
          element={<PullRequests />}
        />


        {/* Commits */}

        <Route
          path="/commits/:owner/:repo"
          element={<Commits />}
        />


        {/* AI Review */}

        <Route
          path="/review"
          element={<Review />}
        />


        {/* Analytics */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />


        {/* Architecture */}

        <Route
          path="/architecture"
          element={<Architecture />}
        />


        {/* Dependency */}

        <Route
          path="/dependency"
          element={<Dependency />}
        />


        {/* Security */}

        <Route
          path="/security"
          element={<Security />}
        />


        {/* Code Quality */}

        <Route
          path="/quality"
          element={<Quality />}
        />


        {/* Bug Fix */}

        <Route
          path="/bugfix"
          element={<BugFix />}
        />


        {/* Explain Code */}

        <Route
          path="/explain"
          element={<Explain />}
        />


        {/* History */}

        <Route
          path="/history"
          element={<History />}
        />


        {/* History Details */}

        <Route
          path="/history/:id"
          element={<HistoryDetails />}
        />


        {/* Profile */}

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* Settings */}

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>


      {/* ---------------- 404 ---------------- */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;