import React from "react";
import { motion } from "framer-motion";

export default function AdminHome() {
  const stats = [
    { title: "Total Products", value: 124, color: "indigo" },
    { title: "Active Orders", value: 18, color: "green" },
    { title: "Pending Enquiries", value: 7, color: "yellow" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Manage Products • Orders • Enquiries • Profile Settings
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className={`p-7 rounded-2xl shadow-xl bg-white border-l-4 border-${item.color}-600`}
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2
              className={`text-5xl font-extrabold text-${item.color}-600 mt-2`}
            >
              {item.value}
            </h2>
            <p className="mt-3 text-gray-600">
              {item.title === "Total Products"
                ? "All active products"
                : item.title === "Active Orders"
                ? "Orders in progress"
                : "New enquiries awaiting response"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="mt-10 bg-white p-7 rounded-2xl shadow-md border">
        <h3 className="text-2xl font-bold text-gray-900">Recent Orders</h3>
        <p className="text-gray-600 text-sm mb-4">
          Latest 5 orders placed by customers
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="py-3 font-semibold">ORD-2201</td>
                <td className="py-3 text-sm">Komal S.</td>
                <td className="py-3 text-sm">₹799</td>
                <td className="py-3 text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Delivered
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="py-3 font-semibold">ORD-2202</td>
                <td className="py-3 text-sm">Rahul M.</td>
                <td className="py-3 text-sm">₹499</td>
                <td className="py-3 text-sm">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                    Preparing
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="py-3 font-semibold">ORD-2203</td>
                <td className="py-3 text-sm">Pooja R.</td>
                <td className="py-3 text-sm">₹249</td>
                <td className="py-3 text-sm">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                    Cancelled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10 p-7 bg-white rounded-2xl shadow-md border">
        <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>

        <div className="mt-5 flex gap-5 flex-wrap">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
            Add New Product
          </button>

          <button className="px-5 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300">
            View All Orders
          </button>

          <button className="px-5 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300">
            Respond to Enquiries
          </button>

          <button className="px-5 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
