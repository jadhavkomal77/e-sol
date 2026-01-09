

import { motion } from "framer-motion";
import { Star, Send, Loader2, MessageSquare } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateFeedbackMutation } from "../redux/apis/superAdminFeedbackApi";

export default function SuperAdminPublicFeedback() {
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  const formik = useFormik({
    initialValues: { name: "", email: "", rating: 5, message: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      rating: Yup.number().min(1).required(),
      message: Yup.string().min(10).required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createFeedback(values).unwrap();
        toast.success("Thank you for your feedback! 💙");
        resetForm();
      } catch {
        toast.error("Failed to submit feedback. Try again!");
      }
    },
  });

  return (
    <section
      id="feedback"
      className="py-8 scroll-mt-28 bg-gradient-to-b from-[#F8FAFC] to-[#EEF3FF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 mb-6">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1220] mb-4">
            Share Your Feedback
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve and deliver better solutions.
          </p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 lg:p-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {/* NAME + EMAIL (SIDE BY SIDE) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  formik={formik}
                  name="name"
                />

                <Field
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  formik={formik}
                  name="email"
                />
              </div>

              {/* RATING */}
            {/* RATING (SCREENSHOT STYLE) */}
<div className="border border-gray-200 rounded-xl p-6 bg-[#FAFBFD]">
  <p className="font-semibold text-gray-800 mb-4">
    How was your experience?
  </p>

  <div className="flex items-center gap-3">
    {[1, 2, 3, 4, 5].map((r) => (
      <button
        key={r}
        type="button"
        onClick={() => formik.setFieldValue("rating", r)}
        className="focus:outline-none"
      >
        <Star
          className={`w-9 h-9 transition ${
            r <= formik.values.rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      </button>
    ))}

    <span className="ml-4 text-gray-600 text-sm">
      {formik.values.rating}/5
    </span>
  </div>
</div>


              {/* MESSAGE */}
              <Field
                label="Your Feedback"
                textarea
                rows={4}
                placeholder="Tell us about your experience..."
                formik={formik}
                name="message"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-[0_6px_20px_rgba(37,99,235,0.35)] disabled:opacity-60 flex items-center justify-center gap-2 transition"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Reusable Field ---------- */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
  rows,
  formik,
}) {
  const hasError = formik.touched[name] && formik.errors[name];

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
          className={`w-full px-4 py-3 rounded-xl border resize-none outline-none focus:ring-2 focus:ring-blue-500 ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {hasError && (
        <p className="text-sm text-red-600 mt-1">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}
