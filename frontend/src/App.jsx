import { Route, Routes, useFetcher, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Attendance from "./pages/Attendance.jsx";
import Login from "./pages/Login.jsx";
import PublicOnlyRoute from "./routes/PublicOnlyRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
