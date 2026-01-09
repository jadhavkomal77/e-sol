
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

import { useCreateContactMutation } from "../redux/apis/contactApi";

const Contact = () => {
  // 🌍 slug based website (multi-tenant)
  const { slug } = useParams();

  const [createContact, { isLoading }] = useCreateContactMutation();

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),

    service: Yup.string()
      .min(2, "Please enter your requirement")
      .required("Service / requirement is required"),

    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },

    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          ...values,
          slug: slug || null, // ⭐ multi-website support
        };

        await createContact(payload).unwrap();

        toast.success("Message sent successfully!", {
          autoClose: 2000,
        });

        resetForm();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to send message");
      }
    },
  });

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center
                 bg-slate-50 px-4 py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white
                   border border-slate-200
                   rounded-2xl shadow-xl p-10"
      >
        {/* ================= HEADER ================= */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Contact Us
          </h2>
          <p className="text-slate-600 mt-2">
            Tell us your requirement — we’ll get back to you
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
  onSubmit={formik.handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  {/* ROW 1 */}
  <InputField
    label="Full Name"
    name="name"
    placeholder="Enter your full name"
    formik={formik}
  />

  <InputField
    label="Email Address"
    name="email"
    type="email"
    placeholder="Enter your email"
    formik={formik}
  />

  {/* ROW 2 */}
  <InputField
    label="Phone Number"
    name="phone"
    placeholder="Enter Your Number"
    formik={formik}
  />

  <InputField
    label="Service / Requirement"
    name="service"
    placeholder="Your service or requirement"
    formik={formik}
  />

  {/* ROW 3 – MESSAGE (FULL WIDTH) */}
  <div className="md:col-span-2">
    <label className="block text-sm font-semibold text-slate-700 mb-1">
      Message
    </label>
    <textarea
      name="message"
      rows={4}
      placeholder="Explain your requirement in detail..."
      value={formik.values.message}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`w-full px-4 py-3 rounded-xl border
        focus:ring-2 focus:ring-blue-600
        ${
          formik.touched.message && formik.errors.message
            ? "border-red-500"
            : "border-slate-300"
        }`}
    />
    {formik.touched.message && formik.errors.message && (
      <p className="text-red-500 text-sm mt-1">
        {formik.errors.message}
      </p>
    )}
  </div>

  {/* ROW 4 – SUBMIT (FULL WIDTH) */}
  <div className="md:col-span-2">
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2
                 bg-blue-600 hover:bg-blue-700
                 text-white py-3 rounded-xl
                 font-semibold transition
                 disabled:opacity-60"
    >
      {isLoading ? "Sending..." : "Send Message"}
      <Send size={18} />
    </button>
  </div>
</form>

      </motion.div>
    </section>
  );
};

export default Contact;

/* ================= REUSABLE INPUT ================= */
function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  formik,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-4 py-3 rounded-xl border
          focus:ring-2 focus:ring-blue-600
          ${
            formik.touched[name] && formik.errors[name]
              ? "border-red-500"
              : "border-slate-300"
          }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}
