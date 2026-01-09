
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);
  const { slug } = useParams();

  // 🚫 Not logged in at all
  if (!admin) return <Navigate to="/adminlogin" replace />;

  const isTenantAdmin = !!admin.slug;
  const correctSlug = slug === admin.slug;

  // 🏢 Tenant Admin Rules
  if (isTenantAdmin) {
    // ❌ Trying to access main admin area
    if (!slug) {
      return <Navigate to={`/site/${admin.slug}/adminDash`} replace />;
    }

    // ❌ Wrong tenant slug access
    if (!correctSlug) {
      return <Navigate to={`/site/${admin.slug}/adminDash`} replace />;
    }
  }

  // 🏛 Main Admin Rules
  if (!isTenantAdmin) {
    // ❌ Main admin trying to access any tenant site
    if (slug) {
      return <Navigate to="/adminDash" replace />;
    }
  }

  // 🟢 Access allowed
  return children;
};

export default AdminProtected;
