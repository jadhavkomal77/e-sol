
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

import { useGetPublicSingleProductQuery } from "../redux/apis/productApi";
import { useCreateEnquiryMutation } from "../redux/apis/enquiryApi";

export default function Enquiry() {
  const navigate = useNavigate();
  const { slug, productId } = useParams();

  /* ================= PRODUCT ================= */
  const { data, isLoading, isError } =
    useGetPublicSingleProductQuery(
      { slug, id: productId },
      { skip: !slug || !productId }
    );

  const product = data?.product;

  const [createEnquiry, { isLoading: submitting }] =
    useCreateEnquiryMutation();

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    name: Yup.string().min(2).required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter 10 digit phone number")
      .required("Phone is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  /* ================= FORMIK ================= */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: product ? `Enquiry for ${product.name}` : "",
      message: "",
      productId,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createEnquiry(values).unwrap();
        toast.success("Enquiry sent successfully!");
        resetForm();
        setTimeout(() => navigate(-1), 1500);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to send enquiry");
      }
    },
  });

  /* ================= STATES ================= */
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError || !product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
        <p className="text-red-500 font-medium">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 underline text-blue-600"
        >
          Go Back
        </button>
      </div>
    );

  const productImage = product.image?.url || product.image;

 
  return (
   
    <section className="min-h-screen bg-slate-50 py-16 px-4">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-6xl mx-auto"
  >
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ================= LEFT : PRODUCT ================= */}
        <div className="bg-slate-100 p-10 flex flex-col items-center justify-center text-center">
          <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-lg bg-white p-3">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) =>
                (e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f1f5f9' width='100' height='100'/%3E%3C/svg%3E")
              }
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-slate-600 max-w-sm">
            Interested in this product?  
            Fill the form and our team will contact you shortly.
          </p>
        </div>

        {/* ================= RIGHT : FORM ================= */}
        <div className="p-10">
          <h3 className="text-xl font-semibold text-slate-900 mb-1">
            Product Enquiry
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Please provide your details
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* NAME */}
            <Input
              icon={<User />}
              name="name"
              placeholder="Full Name"
              formik={formik}
            />

            {/* EMAIL */}
            <Input
              icon={<Mail />}
              name="email"
              type="email"
              placeholder="Email Address"
              formik={formik}
            />

            {/* PHONE – FULL WIDTH */}
            <div className="md:col-span-2">
              <Input
                icon={<Phone />}
                name="phone"
                placeholder="Phone Number"
                formik={formik}
              />
            </div>

            {/* MESSAGE – FULL WIDTH */}
            <div className="md:col-span-2">
              <Textarea
                icon={<MessageSquare />}
                name="message"
                placeholder="Tell us about your requirement..."
                formik={formik}
              />
            </div>

            {/* HIDDEN */}
            <input type="hidden" {...formik.getFieldProps("subject")} />
            <input type="hidden" {...formik.getFieldProps("productId")} />

            {/* SUBMIT */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting || !formik.isValid}
                className="
                  w-full py-4 rounded-xl
                  bg-gradient-to-r from-blue-600 to-blue-700
                  text-white font-semibold
                  shadow-[0_12px_32px_rgba(37,99,235,0.35)]
                  hover:brightness-110
                  transition
                  disabled:opacity-60
                "
              >
                {submitting ? "Sending..." : "Send Enquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </motion.div>
</section>

  );
}

/* ================= INPUT ================= */
function Input({ icon, name, type = "text", placeholder, formik }) {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          {...formik.getFieldProps(name)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 outline-none
            ${
              error
                ? "border-red-400"
                : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
            }`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={14} /> {formik.errors[name]}
        </p>
      )}
    </div>
  );
}

/* ================= TEXTAREA ================= */
function Textarea({ icon, name, placeholder, formik }) {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <div>
      <div className="relative">
        <span className="absolute left-4 top-4 text-slate-400">
          {icon}
        </span>
        <textarea
          rows={5}
          {...formik.getFieldProps(name)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 resize-none outline-none
            ${
              error
                ? "border-red-400"
                : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
            }`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={14} /> {formik.errors[name]}
        </p>
      )}
    </div>
  );
}
