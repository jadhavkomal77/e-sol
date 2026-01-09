

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /* ===== SLUG ===== */
  const parts = location.pathname.split("/");
  const slug = parts[1] === "site" ? parts[2] : null;

  /* ===== API ===== */
  const { data } = useGetPublicNavbarQuery(slug, {
    skip: !slug,
  });

  const buttons =
    data?.buttons
      ?.filter((b) => b.isActive)
      ?.sort((a, b) => a.order - b.order) || [];

  /* ===== SCROLL ===== */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };


const handleClick = (btn) => {
  if (!btn.section) return;

  const homePath = `/site/${slug}`;

  if (location.pathname !== homePath) {
    navigate(homePath);
    setTimeout(() => scrollTo(btn.section), 300);
  } else {
    scrollTo(btn.section);
  }

  setOpen(false);
};


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* BRAND */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/site/${slug}`)}
        >
          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
            {data?.brandName?.[0] || "A"}
          </div>
          <div>
            <h1 className="font-bold text-lg">
              {data?.brandName || "My Website"}
            </h1>
            <p className="text-xs text-blue-600">
              {data?.tagline || ""}
            </p>
          </div>
        </div>

        {/* DESKTOP */}
        <nav className="hidden lg:flex gap-3">
          {buttons.map((btn) => (
            <button
              key={btn._id}
              onClick={() => handleClick(btn)}
              className={`px-5 py-2 rounded-full font-medium transition
                ${
                  btn.isPrimary
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-50"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </nav>

        {/* MOBILE */}
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="flex flex-col p-4 gap-3">
            {buttons.map((btn) => (
              <button
                key={btn._id}
                onClick={() => handleClick(btn)}
                className={`px-4 py-3 rounded-lg text-left font-medium
                  ${
                    btn.isPrimary
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
