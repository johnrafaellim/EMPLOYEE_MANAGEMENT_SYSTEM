import { Navigate, Outlet } from "react-router-dom";
import { isEmployeeLoggedIn } from "../auth/employeeAuth.js";

const PublicOnlyRoute = () =>
  isEmployeeLoggedIn() ? <Navigate to="/" exact /> : <Outlet />;

export default PublicOnlyRoute;
