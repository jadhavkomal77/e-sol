

import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

import { useCreateSuperAdminEnquiryMutation } from "../redux/apis/superAdminEnquiryApi";
import { useGetSuperSingleProductPublicQuery } from "../redux/apis/superAdminProductApi";

export default function SuperAdminEnquiry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSuperSingleProductPublicQuery(id);
  const product = data?.product;
  const productImage = product?.image?.url || product?.image;

  const [createEnquiry, { isLoading: submitting }] =
    useCreateSuperAdminEnquiryMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      productId: id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string(),
      message: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      await createEnquiry(values);
      toast.success("Enquiry sent successfully");
      navigate(-1);
    },
  });

  if (isLoading || !product) return null;

  return (
    <section className="min-h-screen bg-[#F5F8FB] flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-7xl bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-[#F3F6F9] p-12 flex flex-col items-center text-center">
            <div className="w-56 h-56 bg-white rounded-xl border shadow-sm p-3 mb-6">
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {product.name}
            </h2>

            <p className="mt-3 text-slate-600 text-sm max-w-sm">
              Interested in this product? Fill the form and our team will contact you shortly.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-12">
            <h3 className="text-2xl font-semibold text-slate-900">
              Product Enquiry
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              Please provide your details
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  icon={<User size={18} />}
                  placeholder="Full Name"
                  {...formik.getFieldProps("name")}
                />
                <Input
                  icon={<Mail size={18} />}
                  placeholder="Email Address"
                  {...formik.getFieldProps("email")}
                />
              </div>

              {/* PHONE */}
              <Input
                icon={<Phone size={18} />}
                placeholder="Phone Number"
                {...formik.getFieldProps("phone")}
              />

              {/* MESSAGE */}
              <Textarea
                icon={<MessageSquare size={18} />}
                placeholder="Tell us about your requirement..."
                {...formik.getFieldProps("message")}
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
      />
    </div>
  );
}

/* TEXTAREA */
function Textarea({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-4 text-slate-400">
        {icon}
      </span>
      <textarea
        {...props}
        rows={5}
        className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
      />
    </div>
  );
}
