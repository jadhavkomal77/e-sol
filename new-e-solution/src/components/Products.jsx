
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPublicProductsQuery } from "../redux/apis/productApi";

export default function Products() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const finalSlug = slug || "main";

  const { data, isLoading, isError } =
    useGetPublicProductsQuery(finalSlug);

  const products = data?.products || [];

  /* ================= ENQUIRY ================= */
  const handleEnquiry = (id) => {
    navigate(
      slug
        ? `/site/${slug}/enquiry/${id}`
        : `/enquiry/${id}`
    );
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Loading products...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <section className="py-8 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Our <span className="text-blue-600">Products</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Carefully selected products for modern businesses
          </p>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        {products.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white border border-slate-200 rounded-2xl
                           hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                <div className="h-64 flex items-center justify-center bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain p-4
                               group-hover:scale-105 transition"
                  />
                </div>

                {/* INFO */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {product.name}
                  </h3>

                  {/* ✅ DESCRIPTION CONTROL (NO OVERFLOW) */}
                 <p className="text-slate-600 text-sm mb-4 whitespace-pre-wrap break-words">
  {product.description}
</p>


                  {/* PRICE + BUTTON */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={() => handleEnquiry(product._id)}
                      className="inline-flex items-center gap-2
                        px-4 py-2 rounded-lg
                        bg-blue-600 text-white font-medium
                        hover:bg-blue-700 transition"
                    >
                      Enquire <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}


