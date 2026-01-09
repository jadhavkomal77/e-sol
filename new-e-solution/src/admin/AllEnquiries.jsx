

import React from "react";
import {
  useDeleteEnquiryMutation,
  useGetAllEnquiriesQuery,
  useUpdateEnquiryStatusMutation
} from "../redux/apis/enquiryApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AllEnquiries() {
  const { data, isLoading } = useGetAllEnquiriesQuery();
  const enquiries = data?.enquiries || [];

  const [updateStatus] = useUpdateEnquiryStatusMutation();
  const [deleteEnquiry] = useDeleteEnquiryMutation();

  // Loading UI
  if (isLoading)
    return (
      <div className="flex justify-center mt-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );

  // Empty State
  if (enquiries.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-gray-700">No Enquiries Yet</h2>
        <p className="text-gray-500 mt-2">You will see customer enquiries here.</p>
      </div>
    );
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated!");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await deleteEnquiry(id).unwrap();
      toast.success("Deleted successfully!");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Customer Enquiries
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((e, index) => (
              <motion.tr
                key={e._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.subject}</td>
                <td className="p-3 text-gray-700">{e.message}</td>

                <td className="p-3">
                  <select
                    value={e.status}
                    onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                    className="border rounded px-3 py-1 bg-white shadow-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>

              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
