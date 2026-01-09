import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true, // ⭐ one navbar per admin
    },

    brandName: String,
    tagline: String,

    buttons: [
      {
        label: String,        // Home, About, Contact
        section: String,      // home, about, contact
        path: String,         // optional (admin, login)
        isPrimary: Boolean,
        isActive: {
          type: Boolean,
          default: true,
        },
        order: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Navbar", navbarSchema);
