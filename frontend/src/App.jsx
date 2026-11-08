import { Route, Routes, useFetcher, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Attendance from './pages/Attendance.jsx';
import Login from './pages/Login.jsx';
import PublicOnlyRoute from './routes/PublicOnlyRoute.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { useEffect } from 'react';
import Payslip from './pages/Payslip.jsx';
import Leave from './pages/Leave.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const App = () => {
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...agrs) => {
      const response = await originalFetch(...agrs);
      if (response.status === 401) {
        localStorage.removeItem('employee_panel_auth');
        window.location.href = '/login';
      }
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

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
            <Route path="payslip" element={<Payslip />} />
            <Route path="leave" element={<Leave />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
