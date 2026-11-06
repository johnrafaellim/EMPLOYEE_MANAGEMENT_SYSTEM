import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import LoginForm from './components/LoginForm.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Employee from './pages/Employee.jsx';
import Attendance from './pages/Attendance.jsx';
import Payroll from './pages/Payroll.jsx';
import Leave from './pages/Leave.jsx';
import Announcement from './pages/Announcement.jsx';
import { useEffect } from 'react';
import { AUTH_STORAGE_KEY } from './auth/authStore.js';

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
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (response.status === 401) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        window.location.href = '/login';
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/leaves" element={<Leave />} />
            <Route path="/announcements" element={<Announcement />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
};
export default App;
