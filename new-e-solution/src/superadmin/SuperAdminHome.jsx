// import React from "react";
// import { useGetAllAdminsQuery } from "../redux/apis/superAdminApi";
// import { motion } from "framer-motion";

// export default function SuperAdminHome() {
//   const { data, isLoading } = useGetAllAdminsQuery();

//   if (isLoading)
//     return (
//       <div className="p-6 text-center text-lg font-semibold text-gray-700">
//         Loading Dashboard...
//       </div>
//     );

//   const total = data?.admins?.length || 0;
//   const active = data?.admins?.filter((a) => a.isActive).length || 0;
//   const inactive = total - active;

//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-xl">

//       {/* TITLE */}
//       <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//         SuperAdmin Dashboard
//       </h1>
//       <p className="text-gray-600 mt-1">
//         Manage Admins • View System Stats • Control Entire Platform
//       </p>

//       {/* CARDS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

//         {/* TOTAL ADMINS */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-700"
//         >
//           <h2 className="text-lg font-semibold opacity-90">Total Admins</h2>
//           <p className="text-5xl font-bold mt-3">{total}</p>
//           <p className="mt-2 opacity-80 text-sm">Overall Registered Admins</p>
//         </motion.div>

//         {/* ACTIVE ADMINS */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-green-500 to-green-700"
//         >
//           <h2 className="text-lg font-semibold opacity-90">Active Admins</h2>
//           <p className="text-5xl font-bold mt-3">{active}</p>
//           <p className="mt-2 opacity-80 text-sm">Currently Active Accounts</p>
//         </motion.div>

//         {/* INACTIVE ADMINS */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-red-500 to-red-700"
//         >
//           <h2 className="text-lg font-semibold opacity-90">Inactive Admins</h2>
//           <p className="text-5xl font-bold mt-3">{inactive}</p>
//           <p className="mt-2 opacity-80 text-sm">Disabled or Blocked Accounts</p>
//         </motion.div>

//       </div>

//       {/* EXTRA SECTION */}
//       <div className="mt-10 p-6 bg-gray-50 rounded-xl border">
//         <h3 className="text-xl font-bold text-gray-800">Quick Insights</h3>
//         <p className="text-gray-600 mt-1">
//           You can manage all admins, assign roles, view activity, and update settings from this panel.
//         </p>
//       </div>

//     </div>
//   );
// }







import React from "react";
import { useGetAllAdminsQuery } from "../redux/apis/superAdminApi";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

export default function SuperAdminHome() {
  const { data, isLoading } = useGetAllAdminsQuery();

  if (isLoading) {
    return (
      <div className="p-10 text-center text-lg font-semibold text-gray-600">
        Loading SuperAdmin Dashboard...
      </div>
    );
  }

  const admins = data?.admins || [];
  const total = admins.length;
  const active = admins.filter((a) => a.isActive).length;
  const inactive = total - active;

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Monitor platform • Open admin websites • Multi-tenant control
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Total Admins" value={total} gradient="from-indigo-500 to-indigo-700" />
        <StatCard title="Active Admins" value={active} gradient="from-green-500 to-green-700" />
        <StatCard title="Inactive Admins" value={inactive} gradient="from-red-500 to-red-700" />
      </div>

      {/* ================= ADMIN WEBSITES ================= */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Websites
        </h2>
        <p className="text-gray-600 mb-6">
          Click to open each admin’s live website
        </p>

        {admins.length === 0 ? (
          <p className="text-gray-500">No admins found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admins.map((admin) => {
              const websiteUrl = admin.websiteSlug
                ? `/site/${admin.websiteSlug}`
                : null;

              return (
                <motion.div
                  key={admin._id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="border rounded-xl p-6 bg-gray-50 hover:bg-white shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {admin.name || "Admin"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Slug:{" "}
                        <span className="font-mono">
                          {admin.websiteSlug || "Not Assigned"}
                        </span>
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        admin.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {admin.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* ACTION */}
                  <div className="mt-6">
                    {websiteUrl ? (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          w-full inline-flex items-center justify-center gap-2
                          px-4 py-2.5 rounded-lg
                          bg-blue-600 text-white
                          text-sm font-semibold
                          shadow-md shadow-blue-600/30
                          hover:bg-blue-700
                          transition-all
                        "
                      >
                        <FiExternalLink />
                        Open Website
                      </a>
                    ) : (
                      <button
                        disabled
                        className="
                          w-full px-4 py-2.5 rounded-lg
                          bg-gray-300 text-gray-500
                          text-sm font-semibold
                          cursor-not-allowed
                        "
                      >
                        Website Not Available
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= REUSABLE CARD ================= */
function StatCard({ title, value, gradient }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br ${gradient}`}
    >
      <h2 className="text-lg font-semibold opacity-90">{title}</h2>
      <p className="text-5xl font-bold mt-3">{value}</p>
    </motion.div>
  );
}
