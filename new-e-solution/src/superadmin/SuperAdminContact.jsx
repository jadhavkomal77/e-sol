
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateContactMutation } from "../redux/apis/superAdminContactApi";
import { useGetSuperServicesPublicQuery } from "../redux/apis/superAdminServicesApi";

export default function SuperAdminContact() {
  const { data: serviceData, isLoading: serviceLoading } =
    useGetSuperServicesPublicQuery();

  const services = serviceData?.services || [];
  const [createContact, { isLoading }] = useCreateContactMutation();

  const validationSchema = Yup.object({
    name: Yup.string().min(2).required("Full name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    service: Yup.string().required("Service is required"),
    message: Yup.string().min(10).required("Message is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: services[0]?.title || "", // ✅ auto-select first service
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createContact(values).unwrap();
        toast.success("Message sent successfully! 🚀");
        resetForm();
      } catch {
        toast.error("Failed to send message. Try again.");
      }
    },
  });

  return (
    <section
      id="contact"
      className="relative py-8 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFF] to-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-12
        border border-blue-100 shadow-[0_25px_70px_rgba(37,99,235,0.18)]"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Contact Our <span className="text-blue-600">Experts</span>
          </h2>
          <p className="text-slate-600 mt-3">
            Get a response within a few hours 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              icon={<User />}
              placeholder="Enter your name"
              formik={formik}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              icon={<Mail />}
              placeholder="Enter your email"
              formik={formik}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              name="phone"
              icon={<Phone />}
              placeholder="10-digit phone number"
              formik={formik}
            />

            <SelectInput
              label="Select Service"
              name="service"
              icon={<MessageSquare />}
              options={services}
              formik={formik}
              disabled={serviceLoading}
            />
          </div>

          <Textarea
            label="Your Message"
            name="message"
            placeholder="Tell us about your requirement..."
            formik={formik}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-semibold text-white
            bg-gradient-to-r from-blue-600 to-blue-700
            shadow-[0_15px_35px_rgba(37,99,235,0.45)]
            hover:shadow-[0_20px_45px_rgba(37,99,235,0.6)]
            transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? "Sending..." : "Send Message"}
            <Send size={18} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}

/* ---------- Reusable Inputs ---------- */

function Input({ label, name, type = "text", icon, placeholder, formik }) {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <span className="text-blue-600">{icon}</span> {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        className={`w-full min-h-[52px] px-4 py-3.5 rounded-xl border bg-white
        focus:ring-2 focus:ring-blue-500 outline-none transition
        ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <p className="min-h-[20px] text-sm text-red-600 mt-1">
        {error ? formik.errors[name] : ""}
      </p>
    </div>
  );
}

function SelectInput({ label, name, icon, options, formik, disabled }) {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <span className="text-blue-600">{icon}</span> {label}
      </label>
      <select
        {...formik.getFieldProps(name)}
        disabled={disabled}
        className={`w-full min-h-[52px] px-4 py-3.5 rounded-xl border bg-white
        focus:ring-2 focus:ring-blue-500 outline-none transition
        ${error ? "border-red-500" : "border-gray-300"}`}
      >
        {options.map((s) => (
          <option key={s._id} value={s.title}>
            {s.title}
          </option>
        ))}
      </select>
      <p className="min-h-[20px] text-sm text-red-600 mt-1">
        {error ? formik.errors[name] : ""}
      </p>
    </div>
  );
}

function Textarea({ label, name, placeholder, formik }) {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <MessageSquare className="w-5 h-5 text-blue-600" /> {label}
      </label>
      <textarea
        rows={5}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        className={`w-full px-4 py-3.5 rounded-xl border resize-none bg-white
        focus:ring-2 focus:ring-blue-500 outline-none transition
        ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <p className="min-h-[20px] text-sm text-red-600 mt-1">
        {error ? formik.errors[name] : ""}
      </p>
    </div>
  );
}






// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle, Headphones, ShieldCheck, Zap, Phone } from "lucide-react";

// export default function SuperAdminHero() {
//   const navigate = useNavigate();

//   return (
//     <section className="pt-32 pb-24 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 text-center">
        
//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
//         >
//           Smart IT Solutions for Modern Businesses
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-gray-600 mt-4 max-w-2xl mx-auto"
//         >
//           Streamline your business operations with powerful digital tools and expert support.
//         </motion.p>

//         {/* CTA Buttons */}
//         <div className="flex justify-center gap-4 mt-8 flex-wrap">
//           <motion.button
//             whileHover={{ scale: 1.04 }}
//             onClick={() => navigate("/contact")}
//             className="px-8 py-3 bg-emerald-700 text-white rounded-xl 
//             shadow-md hover:bg-emerald-800 font-semibold"
//           >
//             Contact Us
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.04 }}
//             onClick={() => navigate("/products")}
//             className="px-8 py-3 bg-white border border-emerald-700 text-emerald-700 rounded-xl 
//             shadow-sm hover:bg-emerald-50 font-semibold"
//           >
//             View Products
//           </motion.button>
//         </div>

//         {/* Highlight Badges */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-left"
//         >
//           {[
//             { icon: <ShieldCheck />, text: "Secure & Trusted" },
//             { icon: <Zap />, text: "Fast Implementation" },
//             { icon: <CheckCircle />, text: "100% Customer Support" },
//             { icon: <Headphones />, text: "24×7 Service" },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center gap-2 justify-center">
//               <span className="text-emerald-700">{item.icon}</span>
//               <p className="text-gray-700 text-sm font-medium">{item.text}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Floating Call Button */}
//       <a
//         href="tel:+919999999999"
//         className="fixed bottom-6 right-6 bg-emerald-700 text-white p-4 rounded-full shadow-lg 
//         hover:bg-emerald-800 transition-all"
//       >
//         <Phone size={22} />
//       </a>
//     </section>
//   );
// }
