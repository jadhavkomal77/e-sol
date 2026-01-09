
import SuperAbout from "../../models/superadmin/SuperAbout.js";
import sanitizeHtml from "sanitize-html";

const cleanData = (data) => ({
  title: sanitizeHtml(data.title || ""),
  subtitle: sanitizeHtml(data.subtitle || ""),
  description: sanitizeHtml(data.description || ""),
  features: Array.isArray(data.features)
    ? data.features.map((f) => ({ text: sanitizeHtml(f.text) }))
    : [],
});

/* 🌍 Public */
export const getSuperAboutPublic = async (req, res) => {
  try {
    const about = await SuperAbout.findOne().select("-__v");
    res.json({ success: true, about: about || {} });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Private */
export const getSuperAboutPrivate = async (req, res) => {
  try {
    const about = await SuperAbout.findOne();
    res.json({ success: true, about: about || {} });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Save / Update */
export const saveSuperAbout = async (req, res) => {
  try {
    const cleanAbout = cleanData(req.body);

    const updated = await SuperAbout.findOneAndUpdate(
      {},
      cleanAbout,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Updated Successfully",
      about: updated,
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Delete */
export const deleteSuperAbout = async (req, res) => {
  try {
    await SuperAbout.deleteMany({});
    res.json({ success: true, message: "Deleted Successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
