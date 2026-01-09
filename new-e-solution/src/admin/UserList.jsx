

import React from "react";

const UserList = () => {
 
  const users = [
    { _id: 1, name: "Komal Jadhav", email: "komal@gmail.com", phone: "9876543210", role: "User", status: "Active" },
    { _id: 2, name: "Raj Patil", email: "rajpatil@gmail.com", phone: "9865321470", role: "User", status: "Inactive" },
    { _id: 3, name: "Sneha More", email: "sneha@gmail.com", phone: "9871234567", role: "Admin", status: "Active" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 lg:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Phone</th>
              <th className="py-3 px-4 text-left font-semibold">Role</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4">{u.name}</td>
                <td className="py-3 px-4">{u.email}</td>
                <td className="py-3 px-4">{u.phone}</td>
                <td className="py-3 px-4">{u.role}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile screens */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <h3 className="font-semibold text-gray-800">{u.name}</h3>
            <p className="text-sm text-gray-600">{u.email}</p>
            <p className="text-sm text-gray-600">📞 {u.phone}</p>
            <p className="text-sm text-gray-600">
              Role: <span className="font-medium">{u.role}</span>
            </p>
            <p className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  u.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {u.status}
              </span>
            </p>
            <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
