import mongoose from "mongoose";

const superAdminHeroSchema = new mongoose.Schema(
  {
    badgeText: { type: String, default: "" },
    title: { type: String, default: "" },
    highlightText: { type: String, default: "" },
    description: { type: String, default: "" },

    buttonPrimary: { type: String, default: "" },
    buttonSecondary: { type: String, default: "" },

    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },

    stats: [
      {
        value: { type: String, default: "" },
        label: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model("SuperAdminHero", superAdminHeroSchema);
