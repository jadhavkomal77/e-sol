

import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminLogoutMutation } from "../redux/apis/adminApi";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/slices/adminSlice";
import { toast } from "react-toastify";
import {
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaBoxOpen,
  FaEnvelope,
  FaUsers,FaHome,FaBox
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [logoutApi] = useAdminLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/adminDash", icon: <FaTachometerAlt /> },
    { name: "Profile", path: "/adminDash/profile", icon: <FaUser /> },
    { name: "Navbar", path: "/adminDash/navbar", icon: <FaBars /> },
    { name: "Home", path: "/adminDash/hero", icon: <FaHome /> },
    { name: "Add About", path: "/adminDash/addabout", icon: <FaUsers /> },
    { name: "Add Product", path: "/adminDash/add-product", icon: <FaBoxOpen /> },
    { name: "Products", path: "/adminDash/adminproducts", icon: <FaBox /> },
    { name: "Services", path: "/adminDash/addservices", icon: <FaUsers /> },
    { name: "Payment", path: "/adminDash/adminpayment", icon: <MdPayment /> },
    { name: "All Enquiries", path: "/adminDash/allenquiries", icon: <FaUsers /> },
    { name: "Contacts", path: "/adminDash/contactList", icon: <FaEnvelope /> },
    { name: "Feedback", path: "/adminDash/allfeedback", icon: <FaUsers /> },
    { name: "Footer", path: "/adminDash/footer", icon: <FaUsers /> },
  ];

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutAdmin());
      toast.success("Logout Successful!");
      navigate("/adminlogin");
    } catch {
      toast.error("Logout Failed!");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#1E293B] text-white p-4 flex justify-between items-center z-30">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <FaBars
          className="text-3xl cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen w-64
          bg-[#1E293B] text-white z-40 shadow-xl
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col">

          {/* SIDEBAR HEADER */}
          <div className="px-6 py-6 shrink-0 border-b border-white/10">
            <h2 className="text-2xl font-bold tracking-wide">
              Admin Panel
            </h2>
          </div>

          {/* MENU */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl
                    text-left font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-600 shadow-lg"
                        : "hover:bg-gray-700"
                    }
                  `}
                >
                  {/* ICON */}
                  <span className="w-6 h-6 flex items-center justify-center text-lg">
                    {item.icon}
                  </span>

                  {/* TEXT */}
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <div className="p-4 shrink-0 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3
                         p-3 bg-red-600 rounded-xl font-semibold
                         hover:bg-red-700 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 mt-16 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
}



