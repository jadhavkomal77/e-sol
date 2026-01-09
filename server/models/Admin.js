// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String },
//     password: { type: String, required: true },
//     role: { type: String, default: "admin" },
//     isActive: { type: Boolean, default: true },
//     hero: { type: String },

//     // ⭐ Unique website for every admin
//     websiteSlug: { type: String, required: true, unique: true },

//       // isMainSite: { type: Boolean, default: false },
//       subscription: {
//   plan: String,
//   amount: Number,
//   startDate: Date,
//   endDate: Date,
//   isActive: {
//     type: Boolean,
//     default: false
//   }
// },

  
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Admin", adminSchema);



import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: { type: String, trim: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    isActive: { type: Boolean, default: true },

    // ⭐ MAIN THING
    websiteSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    hero: { type: String },

    // ⭐ FUTURE SUBSCRIPTION LOGIC
    subscription: {
      plan: String,
      amount: Number,
      startDate: Date,
      endDate: Date,
      isActive: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
