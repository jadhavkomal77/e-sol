

// import { CreditCard, ShieldCheck } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   useCreateOrderMutation,
//   useVerifyPaymentMutation,
// } from "../redux/apis/superAdminPaymentApi";
// import { useGetPublicNavbarQuery } from "../redux/apis/superAdminNavbarApi";
// import { useGetPublicPaymentQuery } from "../redux/apis/superAdminPaymentSettingsApi";



// export default function SuperAdminPayment() {
//   const [createOrder] = useCreateOrderMutation();
//   const [verifyPayment] = useVerifyPaymentMutation();

//   const { data: navbarData } = useGetPublicNavbarQuery();
//   const { data: paymentData } = useGetPublicPaymentQuery();

//   const navbar = navbarData?.navbar;
//   const payment = paymentData?.payment;

//   const handlePayment = async () => {
//     try {
//       if (!payment?.amount) {
//         toast.error("Payment not configured")
//         return;
//       }

//       const res = await createOrder({
//         amount: payment.amount,
//         purpose: payment.title,
//         customer: {
//           name: "Guest",
//           email: "",
//           phone: "",
//         },
//       }).unwrap();

//       const options = {
//         key: res.key,
//         order_id: res.orderId,
//         currency: res.currency,
//         name: navbar?.brandName || "Company",
//         description: payment.title,
//         handler: async (response) => {
//           await verifyPayment({
//             orderId: res.orderId,
//             paymentId: response.razorpay_payment_id,
//             signature: response.razorpay_signature,
//           }).unwrap();

//           toast.success("Payment Successful 🎉");
//         },
//         theme: { color: "#2563EB" },
//       };

//       new window.Razorpay(options).open();
//     } catch {
//       toast.error("Payment failed, try again");
//     }
//   }

//   return (
//     <section  id="payemnt" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//       <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
//         <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-100 flex items-center justify-center">
//           <CreditCard className="w-8 h-8 text-blue-600" />
//         </div>

//         <h2 className="text-3xl font-bold mb-2">Secure Payment</h2>
//         <p className="text-slate-600 mb-6">
//           Pay securely using Razorpay
//         </p>

//         <div className="bg-slate-50 rounded-xl p-4 mb-6">
//           <p className="text-sm text-slate-500">Amount</p>
//           <p className="text-3xl font-bold text-blue-600">
//             ₹{payment?.amount || "--"}
//           </p>
//         </div>

//         <button
//           onClick={handlePayment}
//           className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600"
//         >
//           Pay Now
//         </button>

//         <div className="flex justify-center gap-2 mt-6 text-sm text-slate-500">
//           <ShieldCheck className="w-4 h-4 text-green-500" />
//           100% Secure Payment
//         </div>
//       </div>
//     </section>
//   );
// }






