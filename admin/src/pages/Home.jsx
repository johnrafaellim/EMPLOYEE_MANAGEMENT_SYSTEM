import Dashboard from '../components/Dashboard.jsx';
import { useData } from '../context/DataContext.jsx';
import { useEffect } from 'react';

const Home = () => {
  const {
    employees,
    employeesLoading,
    fetchEmployees,
    announcements,
    announcementsLoading,
    fetchAnnouncements,
    payrolls,
    payrollsLoading,
    fetchPayrolls,
  } = useData();

  useEffect(() => {
    fetchEmployees();
    fetchAnnouncements();
    fetchPayrolls();

    const interval = setInterval(() => {
      fetchEmployees(true, true);
      fetchAnnouncements(true, true);
      fetchPayrolls(true, true);
    }, 8000);

    const handleFocus = () => {
      fetchEmployees(true, true);
      fetchAnnouncements(true, true);
      fetchPayrolls(true, true);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchEmployees, fetchAnnouncements, fetchPayrolls]);

  const loading = employeesLoading || announcementsLoading || payrollsLoading;

  return (
    <div>
      <Dashboard
        employees={employees}
        announcements={announcements}
        payrolls={payrolls}
        loading={loading}
      />
    </div>
  );
};
export default Home;
