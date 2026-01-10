

import { useParams } from "react-router-dom";
import { Share2, Download, Copy, ShieldCheck } from "lucide-react";
import { useGetPublicPaymentQuery } from "../redux/apis/paymentApi";

export default function Payment() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetPublicPaymentQuery(slug);

  const payment = data?.payment;
  const profileUrl = `${window.location.origin}/site/${slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    alert("Payment link copied");
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Secure Payment",
        text: "Scan & Pay securely",
        url: profileUrl,
      });
    } else {
      copyLink();
    }
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(profileUrl)}`,
      "_blank"
    );
  };

  const downloadQR = async () => {
    const res = await fetch(payment.qrImage.url);
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payment-qr.png";
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Loading secure payment…
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        Payment information not available
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center px-4 py-14">

      {/* PAYMENT SHEET */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-2xl border border-gray-200 p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Scan & Pay
          </h1>

          {payment.businessName && (
            <p className="text-sm text-gray-600">
              Paying to <b>{payment.businessName}</b>
            </p>
          )}
        </div>

        {/* SECURITY BADGE */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} />
            Secure UPI Payment
          </div>
        </div>

        {/* QR HERO */}
        {payment.showQr && payment.qrImage?.url && (
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 border shadow-inner">
              <img
                src={payment.qrImage.url}
                alt="Payment QR"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* UPI DETAILS */}
        {payment.showUpi && (
          <div className="bg-gray-50 rounded-xl border px-4 py-3 text-sm text-gray-700 space-y-1">
            <p><b>UPI Name:</b> {payment.upiName}</p>
            <p><b>UPI ID:</b> {payment.upiId}</p>
          </div>
        )}

        {/* NOTE */}
        {payment.paymentNote && (
          <p className="text-xs text-gray-500 text-center">
            {payment.paymentNote}
          </p>
        )}

        {/* LINK */}
        <div className="flex items-center rounded-lg border overflow-hidden">
          <input
            value={profileUrl}
            readOnly
            className="flex-1 px-3 py-2 text-xs bg-gray-50 outline-none"
          />
          <button
            onClick={copyLink}
            className="px-3 text-gray-500 hover:text-black"
          >
            <Copy size={16} />
          </button>
        </div>

        {/* PRIMARY ACTION */}
        <button
          onClick={shareLink}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm hover:opacity-90"
        >
          <Share2 size={16} />
          Share Payment Link
        </button>

        {/* SECONDARY ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={downloadQR}
            className="border py-2.5 rounded-xl text-sm hover:bg-gray-100"
          >
            Save QR
          </button>

          <button
            onClick={shareWhatsApp}
            className="bg-green-500 text-white py-2.5 rounded-xl text-sm hover:bg-green-600"
          >
            WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}




