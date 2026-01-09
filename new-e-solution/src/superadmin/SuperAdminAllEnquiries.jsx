
import {
  useGetSuperAdminEnquiriesQuery,
  useUpdateSuperAdminEnquiryStatusMutation,
  useDeleteSuperAdminEnquiryMutation,
} from "../redux/apis/superAdminEnquiryApi";
import { toast } from "react-toastify";
import { 
  FiTrash2, FiMail, FiUser, FiClock, FiCheckCircle, 
  FiAlertCircle, FiSearch, FiFilter 
} from "react-icons/fi";

export default function SuperAdminAllEnquiries() {
  const { data, isLoading, isError, refetch } =
    useGetSuperAdminEnquiriesQuery();

  const [updateStatus] = useUpdateSuperAdminEnquiryStatusMutation();
  const [deleteEnquiry] = useDeleteSuperAdminEnquiryMutation();

  const enquiries = data?.enquiries || [];

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated successfully");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      await deleteEnquiry(id).unwrap();
      toast.success("Enquiry deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete enquiry");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0051FF]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <p className="text-red-500 text-lg font-semibold">
            Failed to load enquiries
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F1F5F9] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                Customer Enquiries
              </h1>
              <p className="text-[#6B7280] text-lg">
                Manage and track all customer enquiries
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl bg-white border border-gray-200 
                               hover:bg-[#F1F5F9] transition">
                <FiSearch size={20} className="text-[#6B7280]" />
              </button>
              <button className="p-3 rounded-xl bg-white border border-gray-200 
                               hover:bg-[#F1F5F9] transition">
                <FiFilter size={20} className="text-[#6B7280]" />
              </button>
            </div>
          </div>
          
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard 
              label="Total Enquiries" 
              value={enquiries.length} 
              color="blue" 
            />
            <StatCard 
              label="Pending" 
              value={enquiries.filter(e => e.status === "Pending").length} 
              color="amber" 
            />
            <StatCard 
              label="Resolved" 
              value={enquiries.filter(e => e.status === "Resolved").length} 
              color="emerald" 
            />
          </div>
        </div>

        {/* ENQUIRIES LIST */}
        {enquiries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <FiMail className="mx-auto text-[#6B7280] mb-4" size={48} />
            <p className="text-[#6B7280] text-lg font-medium">
              No enquiries found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((e) => (
              <div
                key={e._id}
                className="bg-white rounded-2xl p-6 sm:p-8 
                          border border-gray-100 shadow-sm
                          hover:shadow-xl hover:border-[#0051FF]/20
                          transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* MAIN CONTENT */}
                  <div className="flex-1 space-y-4">
                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {e.subject}
                        </h3>
                        <p className="text-[#6B7280] leading-relaxed">
                          {e.message}
                        </p>
                      </div>
                      
                      {/* STATUS BADGE */}
                      <StatusBadge status={e.status} />
                    </div>

                    {/* METADATA */}
                    <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
                      <MetadataItem 
                        icon={<FiUser />} 
                        label={e.name} 
                        color="blue" 
                      />
                      <MetadataItem 
                        icon={<FiMail />} 
                        label={e.email} 
                        color="blue" 
                      />
                      <MetadataItem 
                        icon={<FiClock />} 
                        label={new Date(e.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })} 
                        color="blue" 
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 
                                lg:min-w-[200px]">
                    {/* STATUS SELECT */}
                    <select
                      value={e.status}
                      onChange={(ev) => handleStatus(e._id, ev.target.value)}
                      className="px-4 py-3 rounded-xl border border-gray-200
                               bg-white text-gray-900 font-medium text-sm
                               focus:ring-2 focus:ring-[#0051FF] focus:border-transparent
                               hover:border-[#0051FF]/50 transition-all duration-200
                               cursor-pointer"
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Resolved">✔ Resolved</option>
                    </select>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="inline-flex items-center justify-center gap-2
                               px-4 py-3 rounded-xl
                               bg-red-50 text-red-600 border border-red-200
                               hover:bg-red-100 hover:border-red-300
                               font-semibold text-sm
                               transition-all duration-200"
                    >
                      <FiTrash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* HELPER COMPONENTS */
function StatCard({ label, value, color }) {
  const colorClasses = {
    blue: "bg-[#0051FF]/10 text-[#0051FF] border-[#0051FF]/20",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className={`rounded-2xl p-6 border ${colorClasses[color]}`}>
      <p className="text-sm font-semibold mb-2">{label}</p>
      <p className="text-3xl font-extrabold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const isResolved = status === "Resolved";
  
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl
                 text-sm font-semibold border
                 ${
                   isResolved
                     ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                     : "bg-amber-50 text-amber-700 border-amber-200"
                 }`}
    >
      {isResolved ? (
        <FiCheckCircle size={16} />
      ) : (
        <FiAlertCircle size={16} />
      )}
      {status}
    </span>
  );
}

function MetadataItem({ icon, label, color = "blue" }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl 
                     bg-[#0051FF]/10 text-[#0051FF]
                     flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-[#6B7280]">{label}</span>
    </div>
  );
}