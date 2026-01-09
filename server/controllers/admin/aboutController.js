
import About from "../../models/admin/About.js";
import sanitizeHtml from "sanitize-html";

export const getAbout = async (req, res) => {
  const adminId = req.user?.id || req.adminId;
  let about = await About.findOne({ adminId });

  if (!about) {
    about = await About.create({ adminId });
  }

  res.json({
    success: true,
    mainTitle: about.mainTitle,
    mainDescription: about.mainDescription,
    features: about.features,
    whyChoose: about.whyChoose,
    stats: about.stats,
  });
};

export const updateAbout = async (req, res) => {
  const adminId = req.user.id;

  let { mainTitle, mainDescription, features, whyChoose, stats } = req.body;

  mainTitle = sanitizeHtml(mainTitle || "");
  mainDescription = sanitizeHtml(mainDescription || "");

  features = (features || []).map((f) => ({
    icon: sanitizeHtml(f.icon || ""),
    title: sanitizeHtml(f.title || ""),
    description: sanitizeHtml(f.description || ""),
  }));

  whyChoose = (whyChoose || []).map((f) => ({
    icon: sanitizeHtml(f.icon || ""),
    title: sanitizeHtml(f.title || ""),
    description: sanitizeHtml(f.description || ""),
  }));

  const updated = await About.findOneAndUpdate(
    { adminId },
    { mainTitle, mainDescription, features, whyChoose, stats },
    { new: true, upsert: true }
  );

  res.json({ success: true, ...updated.toObject() });
};
