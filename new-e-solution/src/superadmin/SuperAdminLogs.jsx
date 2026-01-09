

import React from "react";
import {
  useGetLogsQuery,
  useClearLogsMutation,
} from "../redux/apis/activityApi";
import { FaTrash } from "react-icons/fa";

export default function SuperAdminLogs() {
  const { data, isLoading, refetch } = useGetLogsQuery();
  const [clearLogs, { isLoading: clearing }] = useClearLogsMutation();

  const logs = data?.logs || [];

  // 🟢 Clear Logs Function
  const handleClear = async () => {
    await clearLogs().unwrap();
    refetch(); 
  };

  if (isLoading)
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading Activity Logs...
      </div>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Activity Logs</h1>

        <button
          onClick={handleClear}
          disabled={clearing}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-60"
        >
          <FaTrash /> {clearing ? "Clearing..." : "Clear Logs"}
        </button>
      </div>

      {/* If No Logs */}
      {logs.length === 0 && (
        <div className="text-center text-gray-600 py-10 text-lg">
          No activity logs found.
        </div>
      )}

      {/* Logs Table */}
      {logs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-3 text-left">Admin</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">IP</th>
                <th className="p-3 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3 font-medium">
                    {log?.adminId?.name || "Unknown"}
                  </td>

                  <td className="p-3 font-semibold text-indigo-700">
                    {log.action}
                  </td>

                  <td className="p-3 text-gray-700">{log.details}</td>

                  <td className="p-3 text-gray-600">{log.ip}</td>

                  <td className="p-3 text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
