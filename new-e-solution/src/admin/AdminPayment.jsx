// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   useGetAdminPaymentQuery,
//   useUpsertAdminPaymentMutation,
// } from "../redux/apis/paymentApi";

// export default function AdminPayment() {
//   const { data, isLoading } = useGetAdminPaymentQuery();
//   const [savePayment, { isLoading: saving }] =
//     useUpsertAdminPaymentMutation();

//   const [qrPreview, setQrPreview] = useState(null);
//   const [qrFile, setQrFile] = useState(null);

//   const [form, setForm] = useState({
//     businessName: "",
//     paymentNote: "",
//     upiId: "",
//     upiName: "",
//     showUpi: true,
//     showQr: true,
//     razorpayEnabled: false,
//     razorpayKeyId: "",
//     razorpayKeySecret: "",
//     isActive: true,
//   });

//   /* ===== Load existing data ===== */
//   useEffect(() => {
//     if (data) {
//       setForm({
//         ...form,
//         ...data,
//         razorpayKeySecret: "", // never prefill secret
//       });

//       if (data?.qrImage?.url) {
//         setQrPreview(data.qrImage.url);
//       }
//     }
//     // eslint-disable-next-line
//   }, [data]);

//   /* ===== Input handlers ===== */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleQrChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setQrFile(file);
//     setQrPreview(URL.createObjectURL(file));
//   };

//   /* ===== Submit ===== */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (qrFile) {
//       formData.append("qrImage", qrFile);
//     }

//     try {
//       await savePayment(formData).unwrap();
//       toast.success("Payment settings saved successfully");
//     } catch (err) {
//       toast.error("Failed to save payment settings");
//     }
//   };

//   if (isLoading) {
//     return <div className="p-6">Loading payment settings...</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-6">
//         Payment Settings
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow"
//       >
//         {/* ===== LEFT ===== */}
//         <div className="space-y-4">
//           <input
//             name="businessName"
//             value={form.businessName}
//             onChange={handleChange}
//             placeholder="Business Name"
//             className="w-full border p-2 rounded"
//           />

//           <input
//             name="upiId"
//             value={form.upiId}
//             onChange={handleChange}
//             placeholder="UPI ID"
//             className="w-full border p-2 rounded"
//           />

//           <input
//             name="upiName"
//             value={form.upiName}
//             onChange={handleChange}
//             placeholder="UPI Name"
//             className="w-full border p-2 rounded"
//           />

//           <textarea
//             name="paymentNote"
//             value={form.paymentNote}
//             onChange={handleChange}
//             placeholder="Payment note (optional)"
//             className="w-full border p-2 rounded"
//           />

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="showUpi"
//               checked={form.showUpi}
//               onChange={handleChange}
//             />
//             Show UPI
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="showQr"
//               checked={form.showQr}
//               onChange={handleChange}
//             />
//             Show QR Code
//           </label>
//         </div>

//         {/* ===== RIGHT ===== */}
//         <div className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">
//               QR Code
//             </label>

//             {qrPreview && (
//               <img
//                 src={qrPreview}
//                 alt="QR Preview"
//                 className="w-40 h-40 object-contain border rounded mb-2"
//               />
//             )}

//             <input type="file" accept="image/*" onChange={handleQrChange} />
//           </div>

//           <hr />

//           <label className="flex items-center gap-2 font-medium">
//             <input
//               type="checkbox"
//               name="razorpayEnabled"
//               checked={form.razorpayEnabled}
//               onChange={handleChange}
//             />
//             Enable Razorpay
//           </label>

//           {form.razorpayEnabled && (
//             <>
//               <input
//                 name="razorpayKeyId"
//                 value={form.razorpayKeyId}
//                 onChange={handleChange}
//                 placeholder="Razorpay Key ID"
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="password"
//                 name="razorpayKeySecret"
//                 value={form.razorpayKeySecret}
//                 onChange={handleChange}
//                 placeholder="Razorpay Key Secret"
//                 className="w-full border p-2 rounded"
//               />
//             </>
//           )}

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="isActive"
//               checked={form.isActive}
//               onChange={handleChange}
//             />
//             Payment Active
//           </label>
//         </div>

//         {/* ===== ACTION ===== */}
//         <div className="md:col-span-2">
//           <button
//             disabled={saving}
//             className="w-full bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
//           >
//             {saving ? "Saving..." : "Save Payment Settings"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAdminPaymentQuery,
  useUpsertAdminPaymentMutation,
} from "../redux/apis/paymentApi";

export default function AdminPayment() {
  const { data, isLoading, error } = useGetAdminPaymentQuery();
  const [savePayment, { isLoading: saving }] =
    useUpsertAdminPaymentMutation();

  const [qrPreview, setQrPreview] = useState(null);
  const [qrFile, setQrFile] = useState(null);

  const [form, setForm] = useState({
    businessName: "",
    paymentNote: "",
    upiId: "",
    upiName: "",
    showUpi: true,
    showQr: true,
    razorpayEnabled: false,
    razorpayKeyId: "",
    razorpayKeySecret: "",
    isActive: true,
  });

  /* ===== Load existing payment ===== */
  useEffect(() => {
    if (data) {
      setForm((prev) => ({
        ...prev,
        ...data,
        razorpayKeySecret: "", // never prefill secret
      }));

      if (data?.qrImage?.url) {
        setQrPreview(data.qrImage.url);
      }
    }
  }, [data]);

  /* ===== Handlers ===== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQrChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setQrFile(file);
    setQrPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (qrFile) formData.append("qrImage", qrFile);

    try {
      await savePayment(formData).unwrap();
      toast.success("Payment settings saved");
    } catch (err) {
      toast.error(err?.data?.message || "Save failed");
    }
  };

  /* ===== UI STATES ===== */
  if (isLoading) return <div className="p-6">Loading...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600">
        Failed to load payment settings
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Payment Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow"
      >
        {/* LEFT */}
        <div className="space-y-4">
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="upiId"
            value={form.upiId}
            onChange={handleChange}
            placeholder="UPI ID"
            className="w-full border p-2 rounded"
          />

          <input
            name="upiName"
            value={form.upiName}
            onChange={handleChange}
            placeholder="UPI Name"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="paymentNote"
            value={form.paymentNote}
            onChange={handleChange}
            placeholder="Payment note"
            className="w-full border p-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showUpi"
              checked={form.showUpi}
              onChange={handleChange}
            />
            Show UPI
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showQr"
              checked={form.showQr}
              onChange={handleChange}
            />
            Show QR Code
          </label>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div>
            <label className="font-medium">QR Code</label>
            {qrPreview && (
              <img
                src={qrPreview}
                alt="QR"
                className="w-36 h-36 object-contain border rounded mb-2"
              />
            )}
            <input type="file" accept="image/*" onChange={handleQrChange} />
          </div>

          <hr />

          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name="razorpayEnabled"
              checked={form.razorpayEnabled}
              onChange={handleChange}
            />
            Enable Razorpay
          </label>

          {form.razorpayEnabled && (
            <>
              <input
                name="razorpayKeyId"
                value={form.razorpayKeyId}
                onChange={handleChange}
                placeholder="Razorpay Key ID"
                className="w-full border p-2 rounded"
              />

              <input
                type="password"
                name="razorpayKeySecret"
                value={form.razorpayKeySecret}
                onChange={handleChange}
                placeholder="Razorpay Key Secret"
                className="w-full border p-2 rounded"
              />
            </>
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Payment Active
          </label>
        </div>

        <div className="md:col-span-2">
          <button
            disabled={saving}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Payment Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
