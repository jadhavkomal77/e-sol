import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true, // one hero per admin
    },

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
        value: { type: String },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);

