import React from "react";
import { useGetAllAdminsQuery } from "../redux/apis/superAdminApi";
import { motion } from "framer-motion";

export default function SuperAdminHome() {
  const { data, isLoading } = useGetAllAdminsQuery();

  if (isLoading)
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-700">
        Loading Dashboard...
      </div>
    );

  const total = data?.admins?.length || 0;
  const active = data?.admins?.filter((a) => a.isActive).length || 0;
  const inactive = total - active;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        SuperAdmin Dashboard
      </h1>
      <p className="text-gray-600 mt-1">
        Manage Admins • View System Stats • Control Entire Platform
      </p>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

        {/* TOTAL ADMINS */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-700"
        >
          <h2 className="text-lg font-semibold opacity-90">Total Admins</h2>
          <p className="text-5xl font-bold mt-3">{total}</p>
          <p className="mt-2 opacity-80 text-sm">Overall Registered Admins</p>
        </motion.div>

        {/* ACTIVE ADMINS */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-green-500 to-green-700"
        >
          <h2 className="text-lg font-semibold opacity-90">Active Admins</h2>
          <p className="text-5xl font-bold mt-3">{active}</p>
          <p className="mt-2 opacity-80 text-sm">Currently Active Accounts</p>
        </motion.div>

        {/* INACTIVE ADMINS */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-red-500 to-red-700"
        >
          <h2 className="text-lg font-semibold opacity-90">Inactive Admins</h2>
          <p className="text-5xl font-bold mt-3">{inactive}</p>
          <p className="mt-2 opacity-80 text-sm">Disabled or Blocked Accounts</p>
        </motion.div>

      </div>

      {/* EXTRA SECTION */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl border">
        <h3 className="text-xl font-bold text-gray-800">Quick Insights</h3>
        <p className="text-gray-600 mt-1">
          You can manage all admins, assign roles, view activity, and update settings from this panel.
        </p>
      </div>

    </div>
  );
}
