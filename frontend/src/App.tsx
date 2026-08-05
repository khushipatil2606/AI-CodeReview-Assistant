import { Routes, Route } from "react-router-dom";
import RepositoryDetails from "./pages/RepositoryDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import PullRequests from "./pages/PullRequests";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import MainLayout from "./layouts/MainLayout";
import Review from "./pages/Review";
import Commits from "./pages/Commits";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Pages with Sidebar */}
      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/repositories"
          element={<Repositories />}
        />
        <Route
          path="/repository/:owner/:repo"
          element={<RepositoryDetails />}
        />
        <Route
          path="/commits/:owner/:repo"
          element={<Commits />}
        />
        <Route
          path="/pullrequests"
          element={<PullRequests />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route path="/history" element={<History />} />
        <Route 
          path="/review" 
          element={<Review />}
        />
      </Route>

    </Routes>
  );
}

export default App;