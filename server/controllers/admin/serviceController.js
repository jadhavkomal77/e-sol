

import validator from "validator";
import sanitizeHtml from "sanitize-html";
import Service from "../../models/admin/Service.js";
// import Service from "../../models/admin/Service";

/* 🛡 Helper: Sanitize Input */
const cleanService = (data) => ({
  title: sanitizeHtml(data.title || ""),
  description: sanitizeHtml(data.description || ""),
  icon: sanitizeHtml(data.icon || ""),
  features: Array.isArray(data.features) ? data.features : [],
  buttonText: sanitizeHtml(data.buttonText || "Learn More"),
  status: true,
});


/* ======================================================
   ADMIN → ADD SERVICE (SECURE)
====================================================== */
export const addService = async (req, res) => {
  try {
    const adminId = req.user.id;

    const cleanData = cleanService(req.body);

    const service = await Service.create({
      ...cleanData,
      adminId, // ✅ REQUIRED
    });

    res.status(201).json({ success: true, service });
  } catch (err) {
    console.error("ADD SERVICE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



/* ======================================================
   ADMIN → GET OWN SERVICES
====================================================== */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ adminId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, services });
  } catch (err) {
    console.error("GET SERVICES ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   PUBLIC → GET SERVICES BY SLUG
====================================================== */
export const getPublicServices = async (req, res) => {
  try {
    const services = await Service.find({
      adminId: req.adminId,
    }).select("-createdBy -adminId");

    res.json({ success: true, services });
  } catch (err) {
    console.error("PUBLIC SERVICES ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   ADMIN → GET ONE (Secure)
====================================================== */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      adminId: req.user.id,
    });

    if (!service)
      return res.status(404).json({ message: "Service not found" });

    res.json({ success: true, service });
  } catch (err) {
    console.error("GET SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   ADMIN → UPDATE SERVICE (Secure)
====================================================== */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      adminId: req.user.id,
    });

    if (!service)
      return res.status(404).json({ message: "Not found" });

Object.assign(service, cleanService(req.body));

    await service.save();

    res.json({ success: true, service });
  } catch (err) {
    console.error("UPDATE SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   ADMIN → DELETE SERVICE
====================================================== */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      adminId: req.user.id,
    });

    if (!service)
      return res.status(404).json({ message: "Not found" });

    await service.deleteOne();

    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    console.error("DELETE SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
