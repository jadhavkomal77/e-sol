
import { motion } from "framer-motion";
import {
  useGetAllFeedbacksQuery,
  useDeleteFeedbackMutation,
  useUpdateFeedbackStatusMutation,
} from "../redux/apis/feedbackApi";
import { toast } from "react-toastify";
import {
  Star,
  Trash2,
  Loader2,
  MessageSquare,
} from "lucide-react";

export default function AllFeedbackList() {
  const { data, isLoading } = useGetAllFeedbacksQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [updateStatus] = useUpdateFeedbackStatusMutation();

  const feedbacks = data?.feedbacks || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await deleteFeedback(id).unwrap();
      toast.success("Feedback deleted successfully ✅");
    } catch {
      toast.error("Failed to delete feedback ❌");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated successfully");
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-gray-500 font-medium">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All User Feedbacks
              </h1>
              <p className="text-gray-600 mt-1">
                Admin overview & resolution management
              </p>
            </div>
          </div>
        </div>

        {/* ================= EMPTY ================= */}
        {feedbacks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 flex flex-col items-center gap-3">
            <MessageSquare className="w-14 h-14 text-gray-300" />
            <p className="text-gray-600 font-medium">
              No feedbacks available
            </p>
          </div>
        ) : (
          /* ================= TABLE ================= */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {feedbacks.map((fb, index) => (
                    <motion.tr
                      key={fb._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="hover:bg-gray-50 transition"
                    >
                      {/* USER */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {fb.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {fb.email}
                        </p>
                      </td>

                      {/* RATING */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < fb.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-xs font-medium text-gray-600">
                            {fb.rating}/5
                          </span>
                        </div>
                      </td>

                      {/* MESSAGE */}
                      <td className="px-6 py-4 max-w-md">
                        <p
                          className="text-sm text-gray-700 truncate"
                          title={fb.message}
                        >
                          {fb.message}
                        </p>
                      </td>

                      {/* STATUS (EDITABLE) */}
                      <td className="px-6 py-4">
                        <select
                          value={fb.status}
                          onChange={(e) =>
                            handleStatusChange(fb._id, e.target.value)
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer
                            ${
                              fb.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(fb._id)}
                          className="
                            inline-flex items-center gap-2
                            px-3 py-1.5
                            text-sm font-medium text-red-600
                            bg-red-50 hover:bg-red-100
                            rounded-lg transition
                          "
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
