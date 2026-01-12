

// import React, { useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaSignOutAlt,
//   FaUser,
//   FaTachometerAlt,
//   FaUsers,
//   FaUserPlus,
//   FaHistory,
//   FaBoxOpen,
//   FaBox,
//   FaEnvelope,
// } from "react-icons/fa";
// import { useSuperAdminLogoutMutation } from "../redux/apis/superAdminApi";
// import { toast } from "react-toastify";

// export default function SuperAdminDashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [logoutApi] = useSuperAdminLogoutMutation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

 
// const menu = [
//   { name: "Dashboard", path: "/superadminDash", icon: <FaTachometerAlt /> },
//   { name: "Profile", path: "/superadminDash/profile", icon: <FaUser /> },
//   { name: "superadminnavbar", path: "/superadminDash/superadminnavbar", icon: <FaUser /> },
//   { name: "All Admins", path: "/superadminDash/alladmins", icon: <FaUsers /> },
//   { name: "Create Admin", path: "/superadminDash/createadmin", icon: <FaUserPlus /> },
//   { name: "Activity Logs", path: "/superadminDash/logs", icon: <FaHistory /> },

//   /* Website Management */
//   { name: "Hero Section", path: "/superadminDash/superadminhero/edit", icon: <FaHistory /> },
//   { name: "About Section", path: "/superadminDash/superadminabout", icon: <FaHistory /> },
//   { name: "Services", path: "/superadminDash/superadminservices", icon: <FaHistory /> },

//   /* PRODUCTS MANAGEMENT */
//   { name: "Add Product", path: "/superadminDash/superadminproducts/add", icon: <FaBoxOpen /> },
//   { name: "Products", path: "/superadminDash/superadminproducts", icon: <FaBox /> },

//   { name: "SAPayment", path: "/superadminDash/superadminpayment", icon: <FaEnvelope /> },
//   { name: "Enquiries", path: "/superadminDash/enquiries", icon: <FaEnvelope /> },
//  { name: "Feedback", path: "/superadminDash/superadminfeedback", icon: <FaEnvelope /> },
//  { name: "Contacts", path: "/superadminDash/superadmincontacts", icon: <FaEnvelope /> },
//  { name: "Footer", path: "/superadminDash/superadminfooter", icon: <FaEnvelope /> },



// ];


//   const handleLogout = async () => {
//     try {
//       await logoutApi().unwrap();
//       toast.success("Logout successful!");
//       navigate("/superadminlogin");
//     } catch {
//       toast.error("Logout failed!");
//     }
//   };

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">

//       {/* MOBILE TOP BAR */}
//       <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0F172A] text-white p-4 flex justify-between items-center z-30">
//         <h2 className="text-xl font-semibold">SuperAdmin</h2>
//         <FaBars className="text-3xl" onClick={() => setSidebarOpen(true)} />
//       </div>

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed lg:static top-0 left-0 h-screen w-64 bg-[#0F172A] text-white 
//           flex flex-col p-6 z-40 shadow-xl overflow-y-auto
//           transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//         `}
//       >

//         {/* Mobile Close Button */}
//         <div className="lg:hidden flex justify-end mb-4">
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-white bg-red-600 px-3 py-1 rounded"
//           >
//             ✖ Close
//           </button>
//         </div>

//         {/* Sidebar Title */}
//         <h2 className="text-2xl font-bold mb-10 tracking-wide">
//           SuperAdmin Panel
//         </h2>

//         {/* MENU SECTION */}
//         <nav className="flex-1 space-y-2">
//           {menu.map((item) => {
//             const isActive = location.pathname === item.path;

//             return (
//               <button
//                 key={item.path}
//                 onClick={() => {
//                   navigate(item.path);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left 
//                   font-medium transition-all duration-200
//                   ${
//                     isActive
//                       ? "bg-indigo-600 shadow-lg"
//                       : "hover:bg-gray-700 hover:pl-6"
//                   }
//                 `}
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 {item.name}
//               </button>
//             );
//           })}
//         </nav>

//         {/* LOGOUT BUTTON */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 flex items-center gap-3 p-3 w-full bg-red-600 rounded-xl 
//           font-semibold hover:bg-red-700 transition"
//         >
//           <FaSignOutAlt className="text-lg" /> Logout
//         </button>

//       </aside>

//       {/* MOBILE OVERLAY */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* MAIN CONTENT — FULL PAGE SCROLL */}
//       <main className="flex-1 overflow-y-auto p-6 mt-16 lg:mt-0">
//         <Outlet />
//       </main>
//     </div>
//   );
// }






import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutApi] = useSuperAdminLogoutMutation();

  const menu = [
    { name: "Dashboard", path: "/superadminDash", icon: <FaTachometerAlt /> },
    { name: "Profile", path: "/superadminDash/profile", icon: <FaUser /> },
    { name: "Navbar", path: "/superadminDash/superadminnavbar", icon: <FaUser /> },
    { name: "All Admins", path: "/superadminDash/alladmins", icon: <FaUsers /> },
    { name: "Create Admin", path: "/superadminDash/createadmin", icon: <FaUserPlus /> },
    { name: "Activity Logs", path: "/superadminDash/logs", icon: <FaHistory /> },

    { name: "Hero Section", path: "/superadminDash/superadminhero/edit", icon: <FaHistory /> },
    { name: "About Section", path: "/superadminDash/superadminabout", icon: <FaHistory /> },
    { name: "Services", path: "/superadminDash/superadminservices", icon: <FaHistory /> },

    { name: "Add Product", path: "/superadminDash/superadminproducts/add", icon: <FaBoxOpen /> },
    { name: "Products", path: "/superadminDash/superadminproducts", icon: <FaBox /> },

    { name: "Payment", path: "/superadminDash/superadminpayment", icon: <FaEnvelope /> },
    { name: "Enquiries", path: "/superadminDash/enquiries", icon: <FaEnvelope /> },
    { name: "Feedback", path: "/superadminDash/superadminfeedback", icon: <FaEnvelope /> },
    { name: "Contacts", path: "/superadminDash/superadmincontacts", icon: <FaEnvelope /> },
    { name: "Footer", path: "/superadminDash/superadminfooter", icon: <FaEnvelope /> },
  ];

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      toast.success("Logout successful");
      navigate("/superadminlogin");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-[#0F172A] text-white flex items-center justify-between px-4 z-50">
        <h2 className="text-lg font-semibold">SuperAdmin</h2>
        <FaBars
          className="text-2xl cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-[#0F172A] text-white
          flex flex-col px-4 py-6 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button (mobile only) */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-sm bg-red-600 px-3 py-1 rounded"
          >
            ✕ Close
          </button>
        </div>

        <h2 className="text-xl font-bold mb-8">SuperAdmin Panel</h2>

        <nav className="flex-1 space-y-2">
          {menu.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  flex items-center gap-4 w-full px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${active ? "bg-indigo-600 shadow" : "hover:bg-gray-700"}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 p-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* ================= OVERLAY (Mobile) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto p-6 mt-14 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
