

// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config"; 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import fs from "fs";
// ADMIN
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import enquiryRoutes from "./routes/admin/enquiryRoutes.js";
import paymentRoutes from "./routes/admin/paymentRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

import navbarRoutes from "./routes/admin/navbarRoutes.js";
import heroRoutes from "./routes/admin/heroRoutes.js";
import aboutRoutes from "./routes/admin/aboutRoutes.js";
import serviceRoutes from "./routes/admin/serviceRoutes.js";
import productRoutes from "./routes/admin/productRoutes.js";
import feedbackRoutes from "./routes/admin/feedbackRoutes.js";
import footerRoutes from "./routes/admin/footerRoutes.js";

// SUPER ADMIN
import superAdminRoutes from "./routes/superAdminRoutes.js";
import superAdminHeroRoutes from "./routes/superadmin/superAdminHeroRoutes.js";
import superAdminAboutRoutes from "./routes/superadmin/superAdminAboutRoutes.js";
import superAdminServiceRoutes from "./routes/superadmin/superAdminServiceRoutes.js";
import superAdminProductRoutes from "./routes/superadmin/superAdminProductRoutes.js";
import superAdminEnquiryRoutes from "./routes/superadmin/superAdminEnquiryRoutes.js";
import superAdminFeedbackRoutes from "./routes/superadmin/superAdminFeedbackRoutes.js";
import superAdminFooterRoutes from "./routes/superadmin/superAdminFooterRoutes.js";
import superAdminNavbarRoutes from "./routes/superadmin/superAdminNavbarRoutes.js";
import superAdminPaymentRoutes from "./routes/superadmin/superAdminPaymentRoutes.js";
import superAdminPaymentSettingRoutes from "./routes/superadmin/superadminpaymentSettingsRoutes.js";



const app = express();
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://e-solution-website.vercel.app"]
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/logs", activityRoutes);

// SUPER ADMIN
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/superadminnavbar", superAdminNavbarRoutes);
app.use("/api/superhero", superAdminHeroRoutes);
app.use("/api/superabout", superAdminAboutRoutes);
app.use("/api/superadminservices", superAdminServiceRoutes);
app.use("/api/superadminproducts", superAdminProductRoutes);
app.use("/api/superadminenquiry", superAdminEnquiryRoutes);
app.use("/api/superadminfeedback", superAdminFeedbackRoutes);
app.use("/api/superadminfooter", superAdminFooterRoutes);
app.use("/api/superadminpayment", superAdminPaymentRoutes);
app.use("/api/superadminpaymentsetting",superAdminPaymentSettingRoutes);


  if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"new-e-solution", "dist","index.html")));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname,"new-e-solution", "dist", "index.html"));
  });
}

app.use((req,res) =>{
  res.sendFile(path.join(__dirname, "new-e-solution","dist", "index.html"));
})



//   app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(path.join(__dirname,"new-e-solution", "dist", "index.html"));
//   });
// }
// app.use((req,res) =>{
// res.sendFile(path.join(__dirname, "new-e-solution","dist", "index.html"));
// })

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);
  res.status(500).json({ message: "Server Error" });
});


const PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

  export  default app