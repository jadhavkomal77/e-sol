import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "userRole", // dynamic reference
    },

    // superadmin | admin
    userRole: {
      type: String,
      enum: ["superadmin", "admin"],
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      default: "",
    },

    ip: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);



export default mongoose.model("ActivityLog", activityLogSchema);
