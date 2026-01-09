

import Enquiry from "../../models/admin/Enquiry.js";
import Product from "../../models/admin/Product.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* ======================================================
   USER → CREATE ENQUIRY (Secure)
====================================================== */
export const createEnquiry = async (req, res) => {
  try {
    let { name, email, phone, subject, message, productId } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !phone || !subject || !message || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // 3️⃣ Validate phone (Indian format)
    if (!validator.isMobilePhone(phone.toString(), "en-IN")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // 4️⃣ Prevent XSS Attacks
    name = sanitizeHtml(name);
    subject = sanitizeHtml(subject);
    message = sanitizeHtml(message);

    // 5️⃣ Validate Product Real & Assigned Admin Exists
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (!product.assignedTo)
      return res.status(400).json({ message: "Product not assigned to admin" });

    const enquiry = await Enquiry.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject,
      message,
      adminId: product.assignedTo,
      userId: req.user?.id || null, // optional login
    });

    res.status(201).json({
      success: true,
      message: "Enquiry sent successfully!",
      enquiryId: enquiry._id,
    });

  } catch (err) {
    console.error("ENQUIRY CREATE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → GET MY ENQUIRIES
====================================================== */
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ adminId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, total: enquiries.length, enquiries });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   USER → SEE MY OWN ENQUIRIES
====================================================== */
export const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ userId: req.user.id });

    res.json({ success: true, total: enquiries.length, enquiries });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → UPDATE STATUS
====================================================== */
export const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry)
      return res.status(404).json({ message: "Enquiry not found" });

    // Ownership Check
    if (enquiry.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    enquiry.status = sanitizeHtml(req.body.status || enquiry.status);
    await enquiry.save();

    res.json({
      success: true,
      message: "Status Updated Successfully",
      enquiry,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → DELETE ENQUIRY
====================================================== */
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry)
      return res.status(404).json({ message: "Not found" });

    if (enquiry.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await enquiry.deleteOne();

    res.json({ success: true, message: "Enquiry Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
