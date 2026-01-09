
import { CheckCircle2 } from "lucide-react";
import { useGetSuperAboutPublicQuery } from "../redux/apis/superAdminAboutApi";

export default function SuperAdminAbout() {
  const { data, isLoading } = useGetSuperAboutPublicQuery();

  if (isLoading) return null;
  const about = data?.about;
  if (!about) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="
        relative py-10 scroll-mt-28
        bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white
        text-[#0F172A]
      "
    >
      {/* Soft background accents */}
      <div className="absolute -top-32 right-0 w-[360px] h-[360px] 
        bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-0 w-[320px] h-[320px] 
        bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 
        grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        {about.image && (
          <div className="relative group">
            {/* Glow */}
            <div
              className="absolute -inset-4 rounded-3xl 
              bg-gradient-to-br from-blue-400/20 to-indigo-400/20 
              blur-2xl opacity-60 group-hover:opacity-80 transition"
            />

            <img
              src={about.image}
              alt="About us"
              className="
                relative rounded-3xl w-full h-[420px] object-cover
                border border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              "
            />
          </div>
        )}

        {/* RIGHT CONTENT */}
        <div className="space-y-7">

          {/* Subtitle */}
          {about.subtitle && (
            <p className="
              inline-block text-sm font-semibold uppercase tracking-widest
              text-blue-600 bg-blue-600/10 px-4 py-1.5 rounded-full
            ">
              {about.subtitle}
            </p>
          )}

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-[#0B1220]">
            {about.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            {about.description}
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {about.features?.map((item, i) => (
              <div
                key={i}
                className="
                  flex gap-3 items-start
                  bg-white/70 backdrop-blur-sm
                  p-4 rounded-xl border border-gray-200
                  shadow-sm hover:shadow-md transition
                "
              >
                <CheckCircle2 className="text-blue-600 w-5 h-5 mt-1 shrink-0" />
                <p className="text-gray-700 text-sm font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo("services")}
            className="
              mt-6 inline-flex items-center justify-center
              px-8 py-3.5 rounded-xl
              bg-blue-600 text-white font-semibold text-sm
              shadow-[0_8px_24px_rgba(37,99,235,0.35)]
              hover:bg-blue-700 hover:shadow-[0_12px_32px_rgba(37,99,235,0.45)]
              transition
            "
          >
            Explore Our Services
          </button>
        </div>
      </div>
    </section>
  );
}
