

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetPublicNavbarQuery } from "../redux/apis/superAdminNavbarApi";

export default function SuperAdminPublicNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useGetPublicNavbarQuery();
  const navbar = data?.navbar;

  const buttons =
    navbar?.buttons
      ?.filter((b) => b.isActive)
      ?.sort((a, b) => a.order - b.order) || [];

  /* ===== SCROLL TO SECTION ===== */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  /* ===== HOME + SCROLL (MAIN SITE ONLY) ===== */
  const goHomeAndScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollTo(section), 400);
    } else {
      scrollTo(section);
    }
  };

  /* ===== BUTTON CLICK ===== */
  const handleClick = (btn) => {
    if (btn.type === "path" && btn.path) {
      navigate(btn.path);
      setOpen(false);
      return;
    }

    if (btn.type === "section" && btn.section) {
      goHomeAndScroll(btn.section);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* BRAND */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
            {navbar?.brandName?.[0] || "M"}
          </div>
          <div>
            <h1 className="font-bold text-lg">
              {navbar?.brandName || "MVAD IT Solutions"}
            </h1>
            <p className="text-xs text-blue-600">
              {navbar?.tagline || ""}
            </p>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex gap-4">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn)}
              className={`px-5 py-2 rounded-full font-semibold transition
                ${
                  btn.isPrimary
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-100 text-gray-800"
                }
              `}
            >
              {btn.label}
            </button>
          ))}
        </nav>

        {/* MOBILE ICON */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <div className="flex flex-col gap-3 p-4">
            {buttons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleClick(btn)}
                className={`px-4 py-3 rounded-lg text-left font-medium
                  ${
                    btn.isPrimary
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }
                `}
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
