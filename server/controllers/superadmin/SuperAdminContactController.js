import SuperAdminContact from "../../models/superadmin/SuperAdminContact.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

/* 🌍 PUBLIC - Create Contact */
export const createSuperAdminContact = async (req, res) => {
  try {
    let { name, email, phone, service, message } = req.body;

    // Required Check
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isMobilePhone(phone.toString(), "en-IN")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    const cleanData = {
      name: sanitizeHtml(name),
      email: email.toLowerCase(),
      phone,
      service: sanitizeHtml(service),
      message: sanitizeHtml(message),
      status: "Pending",
    };

    await SuperAdminContact.create(cleanData);

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 SUPER ADMIN DASHBOARD */
export const getSuperAdminContacts = async (req, res) => {
  try {
    const list = await SuperAdminContact.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, contacts: list });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Update Status */
export const updateContactStatus = async (req, res) => {
  try {
    const contact = await SuperAdminContact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not Found" });

    contact.status = req.body.status;
    await contact.save();

    res.json({ success: true, message: "Status updated", contact });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Delete Contact */
export const deleteContact = async (req, res) => {
  try {
    await SuperAdminContact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
