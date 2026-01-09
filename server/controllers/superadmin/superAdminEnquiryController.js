import SuperAdminEnquiry from "../../models/superadmin/SuperAdminEnquiry.js";
import SuperAdminProduct from "../../models/superadmin/SuperAdminProduct.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

// Sanitize Helper
const clean = (data) => ({
  name: sanitizeHtml(data.name || ""),
  email: data.email?.toLowerCase() || "",
  phone: sanitizeHtml(data.phone || ""),
  subject: sanitizeHtml(data.subject || ""),
  message: sanitizeHtml(data.message || ""),
});

/* 🌍 PUBLIC – Create Enquiry */
export const createSuperAdminEnquiry = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!validator.isMongoId(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await SuperAdminProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const data = clean(req.body);

    if (!validator.isEmail(data.email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    await SuperAdminEnquiry.create({
      ...data,
      productId,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });

  } catch (err) {
    console.error("ENQUIRY CREATE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 SUPERADMIN PANEL – Get All Enquiries */
export const getSuperAdminEnquiries = async (req, res) => {
  try {
    const enquiries = await SuperAdminEnquiry.find()
      .populate("productId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, enquiries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔐 Update Status */
export const updateSuperAdminEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await SuperAdminEnquiry.findById(req.params.id);
    if (!enquiry)
      return res.status(404).json({ message: "Enquiry not found" });

    enquiry.status = sanitizeHtml(req.body.status) || enquiry.status;
    await enquiry.save();

    res.json({ success: true, message: "Status updated", enquiry });
  } catch (err) {
    console.error("STATUS ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Delete Enquiry */
export const deleteSuperAdminEnquiry = async (req, res) => {
  try {
    const deleted = await SuperAdminEnquiry.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Enquiry not found" });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
