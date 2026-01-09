
import * as Icons from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useGetPublicServiceByIdQuery } from "../redux/apis/servicesApi";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* ===== Detect slug ===== */
  const parts = location.pathname.split("/");
  const isSite = parts[1] === "site";
  const slug = isSite ? parts[2] : null;

  const { data, isLoading, isError } =
    useGetPublicServiceByIdQuery(id, { skip: !id });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ===== BACK HANDLER ===== */
  const handleBack = () => {
    if (slug) navigate(`/site/${slug}/services`);
    else navigate("/services");
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-600 font-medium">
              Loading service details...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !data?.service) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
              <AlertCircle className="text-red-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Service Not Found
            </h2>
            <p className="text-slate-600 mb-8">
              The service you are looking for does not exist.
            </p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3
                         bg-slate-900 text-white font-semibold rounded-lg
                         hover:bg-slate-800 transition"
            >
              <ArrowLeft size={18} />
              Back to Services
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ================= DATA ================= */
  const service = data.service;
  const Icon = Icons[service.icon] || Icons.Settings;

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* BACK */}
        <motion.button
          onClick={handleBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 inline-flex items-center gap-2
                     text-slate-700 hover:text-slate-900 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Services
        </motion.button>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm
                     border border-slate-200 overflow-hidden"
        >
          {/* HEADER */}
          <div className="px-8 py-10 bg-gradient-to-br from-slate-50 to-white
                          border-b border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-25 rounded-2xl"></div>
                <div className="relative w-20 h-20 rounded-2xl
                                bg-blue-600 flex items-center justify-center shadow-lg">
                  <Icon className="text-white" size={34} />
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl
                             font-extrabold text-slate-900">
                {service.title}
              </h1>
            </div>
          </div>

          {/* BODY */}
          <div className="px-8 py-10">
            <p className="text-lg text-slate-700 leading-relaxed mb-12">
              {service.description}
            </p>

            {/* FEATURES */}
            {service.features?.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Key Features
                </h2>

                <ul className="grid gap-4">
                  {service.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-100
                                       flex items-center justify-center">
                        <CheckCircle2
                          size={16}
                          className="text-blue-600"
                        />
                      </span>
                      <span className="text-slate-700 text-lg">
                        {f}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* FOOTER CTA */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200
                          flex flex-col sm:flex-row gap-4
                          items-center justify-between">
            <p className="text-slate-600 text-sm">
              Want to know more about this service?
            </p>
            <button
              onClick={() =>
                navigate(slug ? `/site/${slug}/contact` : "/contact")
              }
              className="px-6 py-3 rounded-lg bg-slate-900 text-white
                         font-semibold hover:bg-blue-600 transition"
            >
              Contact Us
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
