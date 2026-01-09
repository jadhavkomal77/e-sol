import { Navigate } from "react-router-dom";
import { useGetSuperAdminProfileQuery } from "../redux/apis/superAdminApi";

export default function SuperAdminProtected({ children }) {
  const { data, isLoading, isError } = useGetSuperAdminProfileQuery();

  // Still loading → wait
  if (isLoading) return <div>Loading...</div>;

  // If error → Not Authenticated
  if (isError) return <Navigate to="/superadminlogin" />;

  // Authenticated Successfully
  return children;
}
