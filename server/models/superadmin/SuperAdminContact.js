// import mongoose from "mongoose";

// const SuperAdminContact = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     service: { type: String, required: true },
//     message: { type: String, required: true },

//     status: {
//       type: String,
//       enum: ["Pending", "Resolved"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("SuperAdminContact", SuperAdminContact);







import mongoose from "mongoose";

const SuperAdminContact = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, index: true },
    service: { type: String, required: true },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);



export default mongoose.model("SuperAdminContact", SuperAdminContact);
