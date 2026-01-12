

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetSuperAdminPaymentQuery, useUpsertSuperAdminPaymentMutation } from "../redux/apis/superAdminPaymentApi";


export default function SuperAdminPaymentEditor() {
  const { data, isLoading, isError } = useGetSuperAdminPaymentQuery();
  const [savePayment, { isLoading: saving }] =
    useUpsertSuperAdminPaymentMutation();

  const [qrPreview, setQrPreview] = useState("");
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

  /* ================= LOAD PAYMENT ================= */
  useEffect(() => {
    if (data?.payment) {
      const p = data.payment;

      setForm({
        businessName: p.businessName || "",
        paymentNote: p.paymentNote || "",
        upiId: p.upiId || "",
        upiName: p.upiName || "",
        showUpi: p.showUpi ?? true,
        showQr: p.showQr ?? true,
        razorpayEnabled: p.razorpayEnabled ?? false,
        razorpayKeyId: p.razorpayKeyId || "",
        razorpayKeySecret: "", // ❌ never preload secret
        isActive: p.isActive ?? true,
      });

      if (p.qrImage?.url) {
        setQrPreview(p.qrImage.url);
      }
    }
  }, [data]);

  /* ================= HANDLERS ================= */
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) =>
      fd.append(k, v)
    );

    if (qrFile) {
      fd.append("qrImage", qrFile); // 🔥 MUST MATCH multer
    }

    try {
      await savePayment(fd).unwrap();
      toast.success("✅ Payment settings saved");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "❌ Save failed");
    }
  };

  /* ================= STATES ================= */
  if (isLoading)
    return <div className="p-6">Loading payment settings...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-600">
        Failed to load payment settings
      </div>
    );

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        💳 Payment Settings
      </h2>

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
          {/* QR */}
          <div>
            <label className="font-medium">QR Code</label>

            {qrPreview && (
              <img
                src={qrPreview}
                alt="QR Preview"
                className="w-36 h-36 object-contain border rounded mb-2"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleQrChange}
            />
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

        {/* SAVE */}
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
