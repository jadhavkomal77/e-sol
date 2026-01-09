import mongoose from "mongoose";

const superAboutSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },

    features: [
      {
        text: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("SuperAbout", superAboutSchema);
