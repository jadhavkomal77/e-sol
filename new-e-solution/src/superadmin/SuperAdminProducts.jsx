
import { useNavigate } from "react-router-dom";
import {
  useGetSuperProductsPrivateQuery,
  useDeleteSuperProductMutation,
} from "../redux/apis/superAdminProductApi";
import { toast } from "react-toastify";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Loader2,
  Eye,
} from "lucide-react";
import { useState } from "react";

export default function SuperAdminProducts() {
  const { data, isLoading } = useGetSuperProductsPrivateQuery();
  const [deleteProduct] = useDeleteSuperProductMutation();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const products = data?.products || [];

  // Loading State
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#0051FF] animate-spin" />
          <p className="text-[#6B7280] font-medium">Loading products...</p>
        </div>
      </div>
    );

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    )
      return;

    setDeletingId(id);
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8 bg-[#F1F5F9] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Product Management
            </h1>
            <p className="text-[#6B7280] font-medium">
              Manage your product catalog and inventory
            </p>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => navigate("/superadminDash/superadminproducts/add")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] bg-[#0051FF] text-white font-semibold hover:bg-[#0044DD] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(0,81,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,81,255,0.4)]"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-[20px] border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <div className="h-48 bg-gradient-to-br from-[#F1F5F9] to-white flex items-center justify-center p-6 relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                    {p.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6B7280] text-sm font-medium mb-4 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl font-bold text-[#0051FF]">
                      ₹{p.price}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-[#F1F5F9]">
                    {/* Edit Button */}
                    <button
                      onClick={() =>
                        navigate(
                          `/superadminDash/superadminproducts/edit/${p._id}`
                        )
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] bg-[#0051FF]/10 text-[#0051FF] font-semibold hover:bg-[#0051FF]/20 active:scale-[0.98] transition-all duration-200"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deletingId === p._id}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] bg-red-50 text-red-600 font-semibold hover:bg-red-100 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete Product"
                    >
                      {deletingId === p._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[20px] border border-[#F1F5F9]">
            <Package className="w-16 h-16 text-[#6B7280] mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No products yet
            </h3>
            <p className="text-[#6B7280] font-medium mb-6 text-center max-w-md">
              Get started by adding your first product to the catalog
            </p>
            <button
              onClick={() => navigate("/superadminDash/superadminproducts/add")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] bg-[#0051FF] text-white font-semibold hover:bg-[#0044DD] active:scale-[0.98] transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Product</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}








// import { useNavigate } from "react-router-dom";
// import {
//   useGetSuperProductsPrivateQuery,
//   useDeleteSuperProductMutation,
// } from "../redux/apis/superAdminProductApi";
// import { toast } from "react-toastify";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Package,
//   Loader2,
// } from "lucide-react";
// import { useState } from "react";

// export default function SuperAdminProducts() {
//   const { data, isLoading } = useGetSuperProductsPrivateQuery();
//   const [deleteProduct] = useDeleteSuperProductMutation();
//   const navigate = useNavigate();
//   const [deletingId, setDeletingId] = useState(null);

//   const products = data?.products || [];

//   /* ================= LOADING ================= */
//   if (isLoading)
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center bg-[#F8FAFC]">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//           <p className="text-gray-500 font-medium">
//             Loading products…
//           </p>
//         </div>
//       </div>
//     );

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product permanently?")) return;

//     setDeletingId(id);
//     try {
//       await deleteProduct(id).unwrap();
//       toast.success("Product deleted successfully");
//     } catch {
//       toast.error("Failed to delete product");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] px-6 py-8">
//       <div className="max-w-7xl mx-auto">

//         {/* ================= HEADER ================= */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
//           <div>
//             <h1 className="text-3xl font-bold text-[#0B1220]">
//               Product Management
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Manage products, pricing and catalog visibility
//             </p>
//           </div>

//           <button
//             onClick={() =>
//               navigate("/superadminDash/superadminproducts/add")
//             }
//             className="
//               inline-flex items-center gap-2
//               px-6 py-3 rounded-xl
//               bg-blue-600 text-white font-semibold
//               hover:bg-blue-700
//               shadow-[0_6px_20px_rgba(37,99,235,0.35)]
//               active:scale-95 transition
//             "
//           >
//             <Plus size={18} />
//             Add Product
//           </button>
//         </div>

//         {/* ================= GRID ================= */}
//         {products.length ? (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.map((p) => (
//               <div
//                 key={p._id}
//                 className="
//                   bg-white rounded-2xl
//                   border border-gray-200
//                   shadow-[0_4px_16px_rgba(0,0,0,0.06)]
//                   hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
//                   transition overflow-hidden
//                 "
//               >
//                 {/* IMAGE */}
//                 <div className="
//                   h-48 bg-gradient-to-br from-slate-50 to-white
//                   flex items-center justify-center p-6
//                 ">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="max-h-full object-contain"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-6">
//                   <h3 className="text-lg font-bold text-[#0B1220] mb-2 line-clamp-1">
//                     {p.name}
//                   </h3>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {p.description}
//                   </p>

//                   <div className="text-2xl font-bold text-blue-600 mb-6">
//                     ₹{p.price}
//                   </div>

//                   {/* ACTIONS */}
//                   <div className="grid grid-cols-2 gap-3 pt-4 border-t">
//                     <button
//                       onClick={() =>
//                         navigate(
//                           `/superadminDash/superadminproducts/edit/${p._id}`
//                         )
//                       }
//                       className="
//                         flex items-center justify-center gap-2
//                         px-4 py-2.5 rounded-xl
//                         bg-blue-600/10 text-blue-600
//                         font-semibold hover:bg-blue-600/20
//                         transition
//                       "
//                     >
//                       <Edit size={16} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       disabled={deletingId === p._id}
//                       className="
//                         flex items-center justify-center gap-2
//                         px-4 py-2.5 rounded-xl
//                         bg-red-50 text-red-600
//                         font-semibold hover:bg-red-100
//                         disabled:opacity-50
//                         transition
//                       "
//                     >
//                       {deletingId === p._id ? (
//                         <Loader2 size={16} className="animate-spin" />
//                       ) : (
//                         <Trash2 size={16} />
//                       )}
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* ================= EMPTY ================= */
//           <div className="
//             flex flex-col items-center justify-center
//             py-24 bg-white rounded-2xl
//             border border-gray-200
//           ">
//             <Package className="w-16 h-16 text-gray-400 mb-4" />
//             <h3 className="text-xl font-bold text-[#0B1220]">
//               No products added
//             </h3>
//             <p className="text-gray-500 mt-2 mb-6 text-center">
//               Start by adding your first product to the catalog
//             </p>
//             <button
//               onClick={() =>
//                 navigate("/superadminDash/superadminproducts/add")
//               }
//               className="
//                 inline-flex items-center gap-2
//                 px-6 py-3 rounded-xl
//                 bg-blue-600 text-white font-semibold
//                 hover:bg-blue-700 transition
//               "
//             >
//               <Plus size={18} />
//               Add Product
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
