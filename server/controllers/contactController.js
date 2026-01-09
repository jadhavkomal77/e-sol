

import Contact from "../models/Contact.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* ======================================================
   PUBLIC → CREATE CONTACT (Secure)
====================================================== */
export const createContact = async (req, res) => {
  try {
    let { name, email, phone, service, message } = req.body;

    // Basic Required Validation
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email & Phone Format Check
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isMobilePhone(phone.toString(), "en-IN")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // Prevent XSS Attack
    name = sanitizeHtml(name);
    service = sanitizeHtml(service);
    message = sanitizeHtml(message);

    // ⭐ Admin Identification Provided by Middleware
    if (!req.adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone,
      service,
      message,
      adminId: req.adminId,
      user: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contactId: contact._id,
    });
  } catch (err) {
    console.error("CONTACT CREATE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → GET OWN CONTACTS (Protected)
====================================================== */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ adminId: req.user.id })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({
      success: true,
      total: contacts.length,
      contacts,
    });
  } catch (err) {
    console.error("CONTACT FETCH ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → DELETE OWN CONTACT (Protected)
====================================================== */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ message: "Contact not found" });

    if (contact.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await contact.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error("CONTACT DELETE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
