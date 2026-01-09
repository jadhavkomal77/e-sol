import jsPDF from "jspdf";

export const downloadInvoice = (payment) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Payment Invoice", 20, 20);

  doc.setFontSize(12);
  doc.text(`Customer Name: ${payment.customer.name}`, 20, 40);
  doc.text(`Email: ${payment.customer.email}`, 20, 48);
  doc.text(`Purpose: ${payment.purpose}`, 20, 56);
  doc.text(`Amount: ₹${payment.amount}`, 20, 64);
  doc.text(`Status: ${payment.status}`, 20, 72);
  doc.text(
    `Date: ${new Date(payment.createdAt).toLocaleDateString()}`,
    20,
    80
  );

  doc.text("Thank you for your business!", 20, 100);

  doc.save(`invoice-${payment.orderId}.pdf`);
};
