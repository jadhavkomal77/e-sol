import { Outlet } from "react-router-dom";
import SuperAdminPublicFooter from "../superadmin/SuperAdminPublicFooter";
import SuperAdminPublicNavbar from "../superadmin/SuperAdminPublicNavbar";

export default function SuperAdminPublicMainLayout() {
  return (
    <>
      <SuperAdminPublicNavbar />
      <Outlet />
      <SuperAdminPublicFooter />
    </>
  );
}




