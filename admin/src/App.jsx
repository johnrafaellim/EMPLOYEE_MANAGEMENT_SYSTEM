import { Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
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
