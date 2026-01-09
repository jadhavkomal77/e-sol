
import * as Icons from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useGetPublicServicesQuery } from "../redux/apis/servicesApi";

export default function Services() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const finalSlug = slug || "main";
  const { data, isLoading, isError } =
    useGetPublicServicesQuery(finalSlug);

  if (isLoading) return loadingUI();
  if (isError) return errorUI();

  const services = data?.services || [];
  if (!services.length) return null;

  return (
    <section
      id="services"
      className="
        relative py-8 scroll-mt-28
        bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]
      "
    >
      {/* background accents */}
      <div className="absolute -top-32 right-0 w-[320px] h-[320px]
        bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-0 w-[300px] h-[300px]
        bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full
            text-xs font-semibold uppercase tracking-widest
            bg-blue-600/10 text-blue-600">
            Our Services
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold mt-5 text-[#0B1220]">
            Smart Solutions for{" "}
            <span className="text-blue-600">Your Business</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Reliable, scalable and future-ready services designed
            to accelerate your growth.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s) => {
            const Icon = Icons[s.icon] || Icons.Cpu;

            return (
              <div
                key={s._id}
                className="
                  group bg-white
                  border border-gray-200
                  rounded-2xl p-8
                  shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_16px_40px_rgba(37,99,235,0.18)]
                  hover:-translate-y-1
                  transition-all duration-300
                  flex flex-col
                  overflow-hidden
                "
              >
                {/* ICON */}
                <div className="w-16 h-16 rounded-xl
                  flex items-center justify-center mx-auto
                  bg-blue-600 text-white
                  shadow-md mb-6">
                  <Icon size={28} />
                </div>

                {/* TITLE */}
                <h3
                  className="
                    text-xl font-bold text-[#0B1220]
                    text-center mb-2
                    line-clamp-2 break-words
                    group-hover:text-blue-600 transition
                  "
                >
                  {s.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-gray-600 text-center text-sm
                    line-clamp-3 break-words
                    flex-grow
                  "
                >
                  {s.description}
                </p>

                {/* CTA */}
                <button
                  onClick={() =>
                    navigate(
                      slug
                        ? `/site/${slug}/services/${s._id}`
                        : `/services/${s._id}`
                    )
                  }
                  className="
                    mt-8 w-full px-6 py-3.5
                    text-sm font-semibold rounded-xl
                    bg-[#0B1220] text-white
                    hover:bg-blue-600
                    hover:shadow-[0_10px_24px_rgba(37,99,235,0.35)]
                    active:scale-95
                    transition inline-flex items-center justify-center gap-2
                  "
                >
                  Learn More <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== Helper UI ===== */
function loadingUI() {
  return (
    <section className="py-28 flex justify-center bg-white">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </section>
  );
}

function errorUI() {
  return (
    <section className="py-28 flex justify-center bg-white">
      <div className="bg-red-50 border border-red-300 rounded-xl px-6 py-4 flex items-center gap-3">
        <AlertCircle className="text-red-600" />
        <p className="text-red-700 font-medium">
          Unable to load services
        </p>
      </div>
    </section>
  );
}
