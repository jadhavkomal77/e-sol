
import * as Icons from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGetSuperServiceByIdPublicQuery } from "../redux/apis/superAdminServicesApi";
import { Loader2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SuperAdminServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetSuperServiceByIdPublicQuery(id, { skip: !id });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ================= LOADING STATE ================= */
  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-slate-400 animate-spin" />
                <div className="absolute inset-0 w-12 h-12 border-4 border-blue-100 rounded-full"></div>
              </div>
              <p className="text-slate-600 text-base font-medium">
                Loading service details...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR STATE ================= */
  if (isError || !data?.service) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Service Not Found
              </h2>
              <p className="text-slate-600 mb-8">
                The service you're looking for doesn't exist or may have been removed.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const service = data.service;
  const Icon = Icons[service.icon] || Icons.Settings;

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 mb-8 sm:mb-12 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Services</span>
        </motion.button>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200/60 px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  {service.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
            {/* Description */}
            <div className="mb-10">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
                {service.description}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 my-10"></div>

            {/* Key Features */}
            {service.features && service.features.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
                  Key Features
                </h2>
                <ul className="grid gap-4 sm:gap-5">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                        </div>
                      </div>
                      <span className="text-base sm:text-lg text-slate-700 leading-relaxed pt-0.5">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Section - Optional CTA */}
          <div className="bg-slate-50/50 border-t border-slate-200/60 px-6 sm:px-8 lg:px-10 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-slate-600">
                Need more information? Contact our support team.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}