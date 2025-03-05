import { Navigate, Outlet } from "react-router-dom";

const ScholarRoute = () => {
  const role = sessionStorage.getItem("role");

  if (role !== "Scholar") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ScholarRoute;
