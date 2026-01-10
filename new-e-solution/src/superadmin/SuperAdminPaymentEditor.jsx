
import { Download } from "lucide-react";
import { useGetAllPaymentsQuery } from "../redux/apis/superAdminPaymentApi";
import { downloadInvoice } from "../shere/invoice";

export default function SuperAdminPaymentEditor() {
  const { data, isLoading } = useGetAllPaymentsQuery();
  const payments = data?.payments || [];

  if (isLoading) return <p className="p-10">Loading payments...</p>;

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Payments</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-medium">
                  {p.customer?.name || "Guest"}
                </td>
                <td>{p.purpose}</td>
                <td className="font-semibold">₹{p.amount}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      p.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>
                  {p.status === "paid" && (
                    <button
                      onClick={() => downloadInvoice(p)}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                    >
                      <Download size={16} /> Invoice
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
