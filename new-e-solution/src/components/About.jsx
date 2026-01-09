
import * as Icons from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGetPublicAboutPageQuery } from "../redux/apis/aboutApi";

function About() {


const location = useLocation();
const parts = location.pathname.split("/");
const slug = parts[1] === "site" ? parts[2] : null;

const { data, isLoading } = useGetPublicAboutPageQuery(slug, {
  skip: !slug,
});


  if (isLoading) {
    return <p className="text-center py-20 text-slate-500">Loading...</p>;
  }

  if (!data) {
    return (
      <p className="text-center py-20 text-slate-500">
        No content available
      </p>
    );
  }


  const features = Array.isArray(data.features) ? data.features : [];
  const stats = data.stats || {};

  return (
    <section
      id="about"
      className="py-8 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span
            className="inline-block px-5 py-2 rounded-full
                       bg-blue-600/10 text-blue-600
                       text-sm font-semibold mb-6"
          >
            About Us
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Your Partner in{" "}
            <span className="text-blue-600">
              {data.mainTitle || "Technology & Security"}
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            {data.mainDescription || "We provide reliable security solutions."}
          </p>
        </div>

        {/* ================= FEATURES ================= */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {features.map((feature, index) => {
              const IconComponent = Icons[feature.icon] || Icons.Shield;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8
                             border border-slate-200
                             hover:border-blue-500
                             hover:shadow-xl transition"
                >
                  <div className="w-14 h-14 rounded-xl
                                  bg-blue-600 text-white
                                  flex items-center justify-center
                                  mb-6 group-hover:scale-110 transition">
                    <IconComponent size={26} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= STATS ================= */}
        <div
          className="rounded-3xl p-10 sm:p-14
                     bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                     text-white shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* WHY CHOOSE */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Why Choose Us?
              </h3>

              <ul className="space-y-4 text-slate-300">
                <li>✔ Professional Installation</li>
                <li>✔ 24/7 Support</li>
                <li>✔ Quality Assured Products</li>
                <li>✔ Transparent Pricing</li>
              </ul>
            </div>

            {/* STATS BOX */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 space-y-6">
              {[
                ["Establishment Year", stats.year],
                ["Projects Completed", stats.projects],
                ["Client Satisfaction", stats.satisfaction],
                ["Service Coverage", stats.coverage],
              ].map(([label, value], i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{label}</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {value || "--"}
                    </span>
                  </div>
                  {i !== 3 && <div className="h-px bg-white/10 mt-4" />}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default About;

