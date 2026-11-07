import Navbar from "../components/Navbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { clearEmployeeLogin, getEmployeeUser } from "../auth/employeeAuth.js";
import { useState } from "react";

const pageTitles = {
  "/": "Dashboard",
  "/attendance": "Attendance",
  "/payslip": "Payslip",
  "/leave": "Leave",
};

const Home = () => {
  const [records, setRecords] = useState([]);
  const [joiningDate, setJoiningDate] = useState(null);
  const [toast, setToast] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const logout = () => {
    clearEmployeeLogin();
    navigate("/login", { replace: true });
  };

  // to fetch the records coming from the server side
  const fetchRecords = async () => {
    const user = getEmployeeUser();

    if (!user || !user.token) return;

    try {
      const attRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const attData = await attRes.json();

      const leaveRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/leaves`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      const leaveData = await leaveRes.json();

      if (attData.success && attData.joiningDate) {
        setJoiningDate(attData.joiningDate);
      }

      const attendanceList =
        attData.success && Array.isArray(attData.attendance)
          ? attData.attendance
          : [];
      const leaveList =
        leaveData.success && Array.isArray(leaveData.leaves)
          ? leaveData.leaves
          : [];

      const mappedAttendance = attendanceList.map((att) => ({
        id: att._id,
        type: "Present",
        name: att.employee?.name || user.name || "Employee",
        empId: att.employee?.employeeId || user.employeeId || "",
        from: att.date.split("T")[0],
        to: att.date.split("T")[0],
        reason: "-",
        status: att.status || "Present",
      }));

      const mappedLeaves = leaveList.map((leave) => ({
        id: leave._id,
        type: "Leave",
        name: leave.employee?.name || user.name || "Employee",
        empId: leave.employee?.employeeId || user.employeeId || "",
        from: leave.fromDate.split("T")[0],
        to: leave.toDate.split("T")[0],
        reason: leave.reason,
        status:
          leave.status === "Pending"
            ? "Leave Applied"
            : leave.status === "Approved"
              ? "Approved"
              : "Rejected",
      }));

      setRecords([...mappedAttendance, ...mappedLeaves]);
    } catch (e) {
      console.error("Failed to fetch attendance or leave records: ", e);
    }
  };

  return (
    <div>
      <Navbar onLogout={logout} />
    </div>
  );
};
export default Home;
