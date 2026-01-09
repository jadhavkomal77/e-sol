

import { useParams } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useGetPublicHeroQuery } from "../redux/apis/heroApi";

export default function Hero() {
  const { slug } = useParams();

  const { data, isLoading } = useGetPublicHeroQuery(slug, {
    skip: !slug,
  });

  if (isLoading || !data?.hero) return null;

  const hero = data.hero;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center
      bg-gradient-to-b from-[#0B1022] via-[#0E1429] to-[#0A0F1F]
      overflow-hidden scroll-mt-28"
    >
      {/* TECH GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-10
        bg-[radial-gradient(circle_at_1px_1px,#3B82F6_1px,transparent_1px)]
        [background-size:36px_36px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24
        grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT ================= */}
        <div className="space-y-7 text-center lg:text-left">

          {/* BADGE */}
          {hero.badgeText && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-blue-600/15 text-blue-400 text-sm font-medium
              border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {hero.badgeText}
            </span>
          )}

          {/* TITLE */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl
            font-bold text-white leading-tight">
            {hero.title}{" "}
            <span className="text-blue-500">{hero.highlightText}</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {hero.description}
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4
            justify-center lg:justify-start pt-2">

            {hero.buttonPrimary && (
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-7 py-3
                bg-blue-600 text-white font-semibold rounded-xl
                shadow-[0_6px_20px_rgba(37,99,235,0.35)]
                hover:bg-blue-700 transition"
              >
                {hero.buttonPrimary}
                <ArrowRight size={18} />
              </button>
            )}

            {hero.buttonSecondary && (
              <button
                onClick={() => scrollTo("contact")}
                className="px-7 py-3 font-semibold rounded-xl
                border border-white/20 text-white
                hover:bg-white/10 transition"
              >
                {hero.buttonSecondary}
              </button>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-wrap gap-6 pt-6
            justify-center lg:justify-start text-gray-300">

            {hero.phone && (
              <Info>
                <Phone size={18} /> {hero.phone}
              </Info>
            )}

            {hero.email && (
              <Info>
                <Mail size={18} /> {hero.email}
              </Info>
            )}

            {hero.location && (
              <Info>
                <MapPin size={18} /> {hero.location}
              </Info>
            )}
          </div>
        </div>

        {/* ================= RIGHT (STATS) ================= */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {hero.stats?.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#131A2F]
              border border-gray-700/30 text-center
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              hover:scale-105 transition"
            >
              <p className="text-3xl font-bold text-blue-400">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Info({ children }) {
  return (
    <div className="flex items-center gap-3
      px-4 py-2 rounded-full
      bg-white/5 border border-white/10">
      {children}
    </div>
  );
}
