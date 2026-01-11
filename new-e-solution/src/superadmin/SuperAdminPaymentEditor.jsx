
// // import { Download } from "lucide-react";
// // import { useGetAllPaymentsQuery } from "../redux/apis/superAdminPaymentApi";
// // import { downloadInvoice } from "../shere/invoice";

// // export default function SuperAdminPaymentEditor() {
// //   const { data, isLoading } = useGetAllPaymentsQuery();
// //   const payments = data?.payments || [];

// //   if (isLoading) return <p className="p-10">Loading payments...</p>;

// //   return (
// //     <div className="p-8 bg-slate-100 min-h-screen">
// //       <h1 className="text-4xl font-bold mb-8">Payments</h1>

// //       <div className="bg-white rounded-2xl shadow overflow-hidden">
// //         <table className="w-full">
// //           <thead className="bg-blue-600 text-white">
// //             <tr>
// //               <th className="p-4 text-left">Customer</th>
// //               <th>Purpose</th>
// //               <th>Amount</th>
// //               <th>Status</th>
// //               <th>Date</th>
// //               <th>Invoice</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {payments.map((p) => (
// //               <tr key={p._id} className="border-t hover:bg-slate-50">
// //                 <td className="p-4 font-medium">
// //                   {p.customer?.name || "Guest"}
// //                 </td>
// //                 <td>{p.purpose}</td>
// //                 <td className="font-semibold">₹{p.amount}</td>
// //                 <td>
// //                   <span
// //                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
// //                       p.status === "paid"
// //                         ? "bg-green-100 text-green-700"
// //                         : "bg-red-100 text-red-600"
// //                     }`}
// //                   >
// //                     {p.status}
// //                   </span>
// //                 </td>
// //                 <td>{new Date(p.createdAt).toLocaleDateString()}</td>
// //                 <td>
// //                   {p.status === "paid" && (
// //                     <button
// //                       onClick={() => downloadInvoice(p)}
// //                       className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
// //                     >
// //                       <Download size={16} /> Invoice
// //                     </button>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }



// // src/superadmin/SuperAdminPaymentEditor.jsx
// import { useEffect, useState } from "react";
// import { Save, CreditCard, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   useGetPaymentSettingsQuery,
//   useSavePaymentSettingsMutation,
// } from "../redux/apis/superAdminPaymentApi";

// export default function SuperAdminPaymentEditor() {
//   const { data, isLoading } = useGetPaymentSettingsQuery();
//   const [savePayment, { isLoading: saving }] =
//     useSavePaymentSettingsMutation();

//   const [form, setForm] = useState({
//     razorpayKeyId: "",
//     razorpayKeySecret: "",
//     razorpayEnabled: false,
//     currency: "INR",
//     isActive: true,
//   });

//   /* LOAD EXISTING SETTINGS */
//   useEffect(() => {
//     if (data?.payment) {
//       setForm({
//         razorpayKeyId: data.payment.razorpayKeyId || "",
//         razorpayKeySecret: "",
//         razorpayEnabled: data.payment.razorpayEnabled ?? false,
//         currency: data.payment.currency || "INR",
//         isActive: data.payment.isActive ?? true,
//       });
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await savePayment(form).unwrap();
//       toast.success("✅ Payment settings saved");
//     } catch {
//       toast.error("❌ Failed to save payment settings");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">

//         {/* HEADER */}
//         <div className="flex items-center gap-3 mb-6">
//           <CreditCard className="text-blue-600" />
//           <h1 className="text-2xl font-bold">
//             SuperAdmin Payment Settings
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* RAZORPAY ENABLE */}
//           <div className="flex items-center justify-between">
//             <label className="font-medium">Enable Razorpay</label>
//             <input
//               type="checkbox"
//               name="razorpayEnabled"
//               checked={form.razorpayEnabled}
//               onChange={handleChange}
//               className="scale-125"
//             />
//           </div>

//           {/* KEY ID */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Razorpay Key ID
//             </label>
//             <input
//               name="razorpayKeyId"
//               value={form.razorpayKeyId}
//               onChange={handleChange}
//               className="w-full input"
//               placeholder="rzp_live_xxxxx"
//             />
//           </div>

//           {/* SECRET */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Razorpay Key Secret
//             </label>
//             <input
//               type="password"
//               name="razorpayKeySecret"
//               value={form.razorpayKeySecret}
//               onChange={handleChange}
//               className="w-full input"
//               placeholder="••••••••"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               (Leave blank to keep existing secret)
//             </p>
//           </div>

//           {/* CURRENCY */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Currency
//             </label>
//             <select
//               name="currency"
//               value={form.currency}
//               onChange={handleChange}
//               className="w-full input"
//             >
//               <option value="INR">INR</option>
//               <option value="USD">USD</option>
//             </select>
//           </div>

//           {/* PAYMENT ACTIVE */}
//           <div className="flex items-center justify-between">
//             <label className="font-medium">
//               Enable Payments on Website
//             </label>
//             <input
//               type="checkbox"
//               name="isActive"
//               checked={form.isActive}
//               onChange={handleChange}
//               className="scale-125"
//             />
//           </div>

//           {/* SAVE */}
//           <button
//             disabled={saving}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2"
//           >
//             {saving ? (
//               <Loader2 className="animate-spin" />
//             ) : (
//               <Save />
//             )}
//             Save Settings
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
