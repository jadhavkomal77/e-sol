

import { useState } from "react";
import {
  useGetDashboardContactsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} from "../redux/apis/superAdminContactApi";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  User, 
  MessageSquare,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Download
} from "lucide-react";

export default function SuperAdminContactEditor() {
  const { data, isLoading } = useGetDashboardContactsQuery();
  const [updateStatus] = useUpdateContactStatusMutation();
  const [deleteContact] = useDeleteContactMutation();

  const contacts = data?.contacts || [];

  // Search + Filter + Pagination
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = contacts.filter(
    (c) =>
      (status === "All" || c.status === status) &&
      (c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.phone?.includes(search) ||
        c.service?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((page - 1) * perPage, page * perPage);

  const handleStatus = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success("Status updated successfully!");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await deleteContact(id).unwrap();
      toast.success("Contact deleted successfully");
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === "Pending").length,
    resolved: contacts.filter((c) => c.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Customer Enquiries
            </h1>
            <p className="text-slate-600 mt-1.5 text-lg">
              Manage and respond to customer inquiries efficiently
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Enquiries"
            value={stats.total}
            icon={<Mail className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock className="w-6 h-6" />}
            color="amber"
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={<CheckCircle2 className="w-6 h-6" />}
            color="green"
          />
        </div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or service..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  text-slate-900 font-medium cursor-pointer appearance-none transition-all min-w-[180px]"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <AnimatePresence>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <p className="text-slate-600 font-medium">Loading enquiries...</p>
                        </div>
                      </td>
                    </tr>
                  ) : displayed.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Mail className="w-12 h-12 text-slate-300" />
                          <p className="text-slate-600 font-medium text-lg">No enquiries found</p>
                          <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayed.map((contact, index) => (
                      <TableRow
                        key={contact._id}
                        contact={contact}
                        index={index}
                        onStatusChange={handleStatus}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{(page - 1) * perPage + 1}</span> to{" "}
                <span className="font-semibold text-slate-900">
                  {Math.min(page * perPage, filtered.length)}
                </span>{" "}
                of <span className="font-semibold text-slate-900">{filtered.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-300 bg-white text-slate-700
                    hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all disabled:hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                    if (
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 1 && p <= page + 1)
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            page === p
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    } else if (p === page - 2 || p === page + 2) {
                      return <span key={p} className="px-2 text-slate-400">...</span>;
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-slate-300 bg-white text-slate-700
                    hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all disabled:hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* Stat Card Component */
function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    amber: "from-amber-500 to-amber-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

/* Table Row Component */
function TableRow({ contact, index, onStatusChange, onDelete }) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-slate-50/50 transition-colors"
    >
      {/* Contact Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
            flex items-center justify-center text-white font-semibold text-sm">
            {contact.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{contact.name}</div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {contact.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
              <Phone className="w-3.5 h-3.5" />
              {contact.phone}
            </div>
          </div>
        </div>
      </td>

      {/* Service */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
          bg-blue-50 text-blue-700 border border-blue-200">
          {contact.service || "N/A"}
        </span>
      </td>

      {/* Message */}
      <td className="px-6 py-4 max-w-xs">
        <div className="text-sm text-slate-700">
          {showMessage ? (
            <div className="space-y-2">
              <p className="leading-relaxed">{contact.message}</p>
              <button
                onClick={() => setShowMessage(false)}
                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
              >
                Show less
              </button>
            </div>
          ) : (
            <div>
              <p className="line-clamp-2">{contact.message}</p>
              {contact.message?.length > 100 && (
                <button
                  onClick={() => setShowMessage(true)}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                >
                  Read more
                </button>
              )}
            </div>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={contact.status}
          onChange={(e) => onStatusChange(contact._id, e.target.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${
              contact.status === "Resolved"
                ? "bg-green-50 text-green-700 border-green-200 focus:ring-green-500 hover:bg-green-100"
                : "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500 hover:bg-amber-100"
            }
          `}
        >
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => onDelete(contact._id)}
          className="inline-flex items-center justify-center p-2 rounded-lg
            bg-red-50 text-red-600 hover:bg-red-100 border border-red-200
            transition-all hover:scale-105 active:scale-95"
          title="Delete contact"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </motion.tr>
  );
}