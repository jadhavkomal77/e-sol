
import SuperAdminService from "../../models/superadmin/SuperAdminService.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

/* Sanitize Helper */
const sanitizeService = (data) => ({
  title: sanitizeHtml(data.title || ""),
  description: sanitizeHtml(data.description || ""),
  icon: sanitizeHtml(data.icon || "Settings"),
  buttonText: sanitizeHtml(data.buttonText || "Learn More"),
  status: data.status ?? true,
  features: Array.isArray(data.features)
    ? data.features.map((f) => sanitizeHtml(f))
    : (data.features?.split(",") || []).map((f) => sanitizeHtml(f)),
});

/* =====================================================
   🔐 Add Service (SuperAdmin)
===================================================== */
export const addSuperService = async (req, res) => {
  try {
    const cleanService = sanitizeService(req.body);
    const service = await SuperAdminService.create(cleanService);

    res.status(201).json({ success: true, service });
  } catch (err) {
    console.error("ADD SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🔐 Get All Services (Dashboard)
===================================================== */
export const getSuperServicesPrivate = async (req, res) => {
  try {
    const list = await SuperAdminService.find().sort({ createdAt: -1 });
    res.json({ success: true, services: list });
  } catch (err) {
    console.error("GET SERVICES ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🌍 Public → Only Active Services
===================================================== */
export const getSuperServicesPublic = async (req, res) => {
  try {
    const list = await SuperAdminService.find({ status: true }).select(
      "title description features icon buttonText"
    );
    res.json({ success: true, services: list });
  } catch (err) {
    console.error("PUBLIC SERVICES ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🔐 Update Service
===================================================== */
export const updateSuperService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid ID" });

    const cleanService = sanitizeService(req.body);

    const updated = await SuperAdminService.findByIdAndUpdate(
      id,
      cleanService,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Service Not Found" });

    res.json({ success: true, service: updated });

  } catch (err) {
    console.error("UPDATE SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🔐 Delete Service
===================================================== */
export const deleteSuperService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid ID" });

    const deleted = await SuperAdminService.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Service Not Found" });

    res.json({ success: true, message: "Service Deleted" });

  } catch (err) {
    console.error("DELETE SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🌍 Public → Single Active Service
===================================================== */
export const getSuperServiceByIdPublic = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid ID" });

    const service = await SuperAdminService.findById(id).select(
      "title description features icon buttonText status"
    );

    if (!service || !service.status)
      return res.status(404).json({ message: "Service Not Found" });

    res.json({ success: true, service });

  } catch (err) {
    console.error("PUBLIC SINGLE SERVICE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
