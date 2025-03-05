import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const role = sessionStorage.getItem("role");

  if (role !== "Admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
