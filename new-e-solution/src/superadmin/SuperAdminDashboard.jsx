

import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaHistory,
  FaBoxOpen,
  FaBox,
  FaEnvelope,
} from "react-icons/fa";
import { useSuperAdminLogoutMutation } from "../redux/apis/superAdminApi";
import { toast } from "react-toastify";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApi] = useSuperAdminLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
const menu = [
  { name: "Dashboard", path: "/superadminDash", icon: <FaTachometerAlt /> },
  { name: "Profile", path: "/superadminDash/profile", icon: <FaUser /> },
  { name: "superadminnavbar", path: "/superadminDash/superadminnavbar", icon: <FaUser /> },
  { name: "All Admins", path: "/superadminDash/alladmins", icon: <FaUsers /> },
  { name: "Create Admin", path: "/superadminDash/createadmin", icon: <FaUserPlus /> },
  { name: "Activity Logs", path: "/superadminDash/logs", icon: <FaHistory /> },

  /* Website Management */
  { name: "Hero Section", path: "/superadminDash/superadminhero/edit", icon: <FaHistory /> },
  { name: "About Section", path: "/superadminDash/superadminabout", icon: <FaHistory /> },
  { name: "Services", path: "/superadminDash/superadminservices", icon: <FaHistory /> },

  /* PRODUCTS MANAGEMENT */
  { name: "Add Product", path: "/superadminDash/superadminproducts/add", icon: <FaBoxOpen /> },
  { name: "Products", path: "/superadminDash/superadminproducts", icon: <FaBox /> },

  { name: "Enquiries", path: "/superadminDash/enquiries", icon: <FaEnvelope /> },
 { name: "Feedback", path: "/superadminDash/superadminfeedback", icon: <FaEnvelope /> },
 { name: "Contacts", path: "/superadminDash/superadmincontacts", icon: <FaEnvelope /> },
 { name: "Footer", path: "/superadminDash/superadminfooter", icon: <FaEnvelope /> },

  { name: "SuperAdminPayment", path: "/superadminDash/superadminpayment", icon: <FaEnvelope /> },


];


  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      toast.success("Logout successful!");
      navigate("/superadminlogin");
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0F172A] text-white p-4 flex justify-between items-center z-30">
        <h2 className="text-xl font-semibold">SuperAdmin</h2>
        <FaBars className="text-3xl" onClick={() => setSidebarOpen(true)} />
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen w-64 bg-[#0F172A] text-white 
          flex flex-col p-6 z-40 shadow-xl overflow-y-auto
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white bg-red-600 px-3 py-1 rounded"
          >
            ✖ Close
          </button>
        </div>

        {/* Sidebar Title */}
        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          SuperAdmin Panel
        </h2>

        {/* MENU SECTION */}
        <nav className="flex-1 space-y-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left 
                  font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-600 shadow-lg"
                      : "hover:bg-gray-700 hover:pl-6"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 p-3 w-full bg-red-600 rounded-xl 
          font-semibold hover:bg-red-700 transition"
        >
          <FaSignOutAlt className="text-lg" /> Logout
        </button>

      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT — FULL PAGE SCROLL */}
      <main className="flex-1 overflow-y-auto p-6 mt-16 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
