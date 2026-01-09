

import { motion } from "framer-motion";
import { Star, Send, Loader2, MessageSquare } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useCreateFeedbackMutation } from "../redux/apis/feedbackApi";

export default function Feedback() {
  const { slug } = useParams();
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Minimum 2 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    rating: Yup.number().min(1, "Please select rating").required(),
    message: Yup.string()
      .min(10, "Minimum 10 characters")
      .max(500, "Maximum 500 characters")
      .required("Message is required"),
  });

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      rating: 5,
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createFeedback({ ...values, slug }).unwrap();
        toast.success("Thank you for your feedback 💙");
        resetForm({ values: { name: "", email: "", rating: 5, message: "" } });
      } catch (err) {
        toast.error(err?.data?.message || "Failed to submit feedback");
      }
    },
  });

  return (
    <section
      id="feedback"
      className="py-8 bg-gradient-to-b from-[#F8FAFC] to-[#EEF3FF]"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1220]">
            Customer Feedback
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve our services and experience.
          </p>
        </motion.div>

        {/* ================= FORM CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.08)]">
          <form onSubmit={formik.handleSubmit} className="space-y-8">

  {/* ================= BASIC INFO ================= */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Field
      label="Full Name"
      name="name"
      placeholder="Enter Your Name"
      formik={formik}
    />

    <Field
      label="Email Address"
      name="email"
      type="email"
      placeholder="Enter Your Email"
      formik={formik}
    />
  </div>

  {/* ================= RATING BLOCK ================= */}
  <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-5">
    <label className="block text-sm font-semibold text-gray-800 mb-3">
      How was your experience?
    </label>

    <div className="flex items-center gap-3">
      {[1, 2, 3, 4, 5].map((r) => (
        <button
          type="button"
          key={r}
          onClick={() => formik.setFieldValue("rating", r)}
          className="transition hover:scale-110"
        >
          <Star
            className={`w-8 h-8 ${
              r <= formik.values.rating
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}

      <span className="ml-3 text-sm text-gray-500">
        {formik.values.rating}/5
      </span>
    </div>
  </div>

  {/* ================= MESSAGE ================= */}
  <div>
    <Field
      textarea
      rows={5}
      label="Your Feedback"
      name="message"
      placeholder="Tell us what you liked, what we can improve, or your overall experience…"
      formik={formik}
    />

    <div className="text-right text-xs text-gray-400 mt-1">
      {formik.values.message.length}/500
    </div>
  </div>

  {/* ================= SUBMIT ================= */}
  <div className="pt-2">
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="submit"
      disabled={isLoading || !formik.isValid}
      className="
        w-full py-4 rounded-xl
        bg-gradient-to-r from-blue-600 to-blue-700
        text-white font-semibold
        shadow-[0_12px_32px_rgba(37,99,235,0.35)]
        hover:brightness-110
        disabled:opacity-50
        flex items-center justify-center gap-2
        transition
      "
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          Submit Feedback
          <Send className="w-5 h-5" />
        </>
      )}
    </motion.button>
  </div>
</form>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= FIELD ================= */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
  rows,
  formik,
}) {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`
            w-full px-4 py-3 rounded-xl border resize-none
            focus:ring-2 focus:ring-blue-500 outline-none
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`
            w-full px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-blue-500 outline-none
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}
