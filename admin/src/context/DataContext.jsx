import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { useAuth } from '../auth/useAuth.js';

const DataContext = createContext(null);

const BASE = process.env.VITE_BACKEND_URL;

export const DataProvider = ({ children }) => {
  const { user } = useAuth();

  // for employees
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [employeesFetched, setEmployeesFetched] = useState(false);
  const employeesFetchingRef = useRef(false);

  const fetchEmployees = useCallback(
    async (force = false, silent = false) => {
      if (!user?.token) return;
      if (!force && employeesFetched) return;
      if (employeesFetchingRef.current) return;
      employeesFetchingRef.current = true;
      if (!silent) setEmployeesLoading(true);

      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/employees`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          const mapped = data.employee.map((emp) => ({
            ...emp,
            id: emp.employeeId,
            profileImage: emp.profileImage
              ? emp.profileImage.startsWith('http') ||
                emp.profileImage.startsWith('data:')
                ? emp.profileImage
                : `${BASE}/${emp.profileImage.replace(/\\/g, '/')}`
              : '',
            joiningDate: emp.joiningDate ? emp.joiningDate.split('T')[0] : '',
          }));

          setEmployees(mapped);
          setEmployeesFetched(true);
        }
      } catch (e) {
        console.error('DataContext: fetchEmployees error', e);
      } finally {
        if (!silent) setEmployeesLoading(false);
        employeesFetchingRef.current = false;
      }
    },
    [user?.token, employeesFetched]
  );

  // for payrolls
  const [payrolls, setPayrolls] = useState([]);
  const [payrollsLoading, setPayrollsLoading] = useState(false);
  const [payrollsFetched, setPayrollsFetched] = useState(false);
  const payrollsFetchingRef = useRef(false);

  const fetchPayrolls = useCallback(
    async (force = false, silent = false) => {
      if (!user?.token) return;
      if (!force && payrollsFetched) return;
      if (payrollsFetchingRef.current) return;
      payrollsFetchingRef.current = true;

      if (!silent) setPayrollsLoading(true);

      try {
        const res = await fetch(`${process.env.VITE_BACKEND_URL}/api/payroll`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          const mapped = data.records.map((rec) => ({
            ...rec,
            id: rec.payrollId,
          }));

          setPayrolls(mapped);
          setPayrollsFetched(true);
        }
      } catch (e) {
        console.error('DataContext: fetchPayrolls error', e);
      } finally {
        if (!silent) setPayrollsLoading(false);
        payrollsFetchingRef.current = false;
      }
    },
    [user?.token, payrollsFetched]
  );

  // announcements
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [announcementsFetched, setAnnouncementsFetched] = useState(false);
  const announcementsFetchingRef = useRef(false);

  const fetchAnnouncements = useCallback(
    async (force = false, silent = false) => {
      if (!user?.token) return;
      if (!force && announcementsFetched) return;
      if (announcementsFetchingRef.current) return;
      announcementsFetchingRef.current = true;
      if (!silent) setAnnouncementsLoading(true);
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/announcements`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setAnnouncements(data.announcements || []);
          setAnnouncementsFetched(true);
        }
      } catch (e) {
        console.error('DataContext: fetchAnnouncements error', e);
      } finally {
        if (!silent) setAnnouncementsLoading(false);
        announcementsFetchingRef.current = false;
      }
    },
    [user?.token, announcementsFetched]
  );

  // leaves
  const [leaves, setLeaves] = useState([]);
  const [leavesLoading, setLeavesLoading] = useState(false);
  const [leavesFetched, setLeavesFetched] = useState(false);
  const leavesFetchingRef = useRef(false);

  const fetchLeaves = useCallback(
    async (force = false, silent = false) => {
      if (!user.token) return;
      if (!force && leavesFetched) return;
      if (leavesFetchingRef.current) return;
      leavesFetchingRef.current = true;
      if (!silent) setLeavesLoading(true);

      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/admin/attendance/leaves`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          setLeaves(data.leaves || []);
          setLeavesFetched(true);
        }
      } catch (e) {
        console.error('DataContext: fetchLeaves error', e);
      } finally {
        if (!silent) setLeavesLoading(false);
        leavesFetchingRef.current = false;
      }
    },
    [user?.token, leavesFetched]
  );

  return (
    <DataContext.Provider
      value={{
        employees,
        setEmployees,
        employeesLoading,
        employeesFetched,
        fetchEmployees,

        payrolls,
        setPayrolls,
        payrollsLoading,
        payrollsFetched,
        fetchPayrolls,

        announcements,
        setAnnouncements,
        announcementsLoading,
        announcementsFetched,
        fetchAnnouncements,

        leaves,
        setLeaves,
        leavesLoading,
        leavesFetched,
        fetchLeaves,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// for useData
export const useData = () => {
  const ctx = useContext(DataContext);

  if (!ctx) throw new Error('useData must be used within a DataProvider');

  return ctx;
};
