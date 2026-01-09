
import { ChevronRight, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetSuperProductsPublicQuery } from "../redux/apis/superAdminProductApi";

export default function SuperAdminProductsPublic() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSuperProductsPublicQuery();

  const products = data?.products || [];

  /* ================= LOADING ================= */
  if (isLoading)
    return (
      <section id="products" className="py-24 bg-[#F8FAFC]">
        <div className="flex justify-center min-h-[50vh] items-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">
              Loading products…
            </p>
          </div>
        </div>
      </section>
    );

  /* ================= ERROR ================= */
  if (isError)
    return (
      <section id="products" className="py-24 bg-[#F8FAFC]">
        <div className="flex justify-center min-h-[50vh] items-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <p className="text-red-600 font-semibold">
              Failed to load products
            </p>
          </div>
        </div>
      </section>
    );

  if (!products.length) return null;

  return (
    <section
      id="products"
      className="relative py-8 bg-[#F8FAFC] overflow-hidden scroll-mt-28"
    >
      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]
        bg-[radial-gradient(circle_at_1px_1px,#0051FF_1px,transparent_1px)]
        [background-size:48px_48px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2
            rounded-full bg-blue-600/10 text-blue-600
            text-sm font-semibold mb-6">
            <Sparkles size={16} />
            Premium Technology
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1220] mb-5">
            Enterprise-Grade{" "}
            <span className="text-blue-600">Products</span>
          </h2>

          <p className="text-gray-600 text-lg">
            Carefully curated solutions built for performance,
            security and long-term scalability.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                group bg-white rounded-2xl
                border border-gray-200
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                hover:shadow-[0_16px_40px_rgba(0,81,255,0.18)]
                hover:-translate-y-1
                transition-all duration-300
                overflow-hidden
              "
            >
              {/* IMAGE */}
              <div className="
                h-64 flex items-center justify-center
                bg-gradient-to-br from-slate-50 to-white
                p-8
              ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    max-h-full object-contain
                    group-hover:scale-105 transition
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="p-7 flex flex-col">
                <h3 className="text-xl font-bold text-[#0B1220] mb-3">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-5 border-t">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{product.price}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/superproducts/enquiry/${product._id}`)
                    }
                    className="
                      inline-flex items-center gap-2
                      px-5 py-2.5 rounded-xl
                      bg-blue-600 text-white font-semibold
                      hover:bg-blue-700
                      shadow-[0_6px_20px_rgba(37,99,235,0.35)]
                      active:scale-95 transition
                    "
                  >
                    Enquiry
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
