

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetSuperProductsPrivateQuery,
//   useUpdateSuperProductMutation,
// } from "../redux/apis/superAdminProductApi";
// import { toast } from "react-toastify";
// import {
//   ArrowLeft,
//   Save,
//   Upload,
//   Package,
//   Loader2,
//   X,
// } from "lucide-react";

// export default function SuperAdminEditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data } = useGetSuperProductsPrivateQuery();
//   const [updateProduct, { isLoading }] = useUpdateSuperProductMutation();

//   const product = data?.products?.find((p) => p._id === id);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     features: "",
//     image: "", // ✅ base64
//   });

//   const [preview, setPreview] = useState("");
//   const [errors, setErrors] = useState({});

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || "",
//         price: product.price || "",
//         category: product.category || "",
//         description: product.description || "",
//         features: product.features?.join(", ") || "",
//         image: "", // only send if changed
//       });
//       setPreview(product.image || "");
//     }
//   }, [product]);

//   /* ================= INPUT ================= */
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   /* ================= IMAGE → BASE64 ================= */
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, image: reader.result }));
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setFormData((prev) => ({ ...prev, image: "" }));
//     setPreview(product?.image || "");
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     const e = {};
//     if (!formData.name.trim()) e.name = "Name required";
//     if (!formData.price || Number(formData.price) <= 0)
//       e.price = "Valid price required";
//     if (!formData.category.trim()) e.category = "Category required";
//     if (!formData.description.trim()) e.description = "Description required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* ================= SUBMIT (JSON ONLY) ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return toast.error("Fix form errors");

//     try {
//       await updateProduct({
//         id,
//         data: {
//           ...formData,
//           features: formData.features
//             .split(",")
//             .map((f) => f.trim())
//             .filter(Boolean),
//         },
//       }).unwrap();

//       toast.success("✅ Product updated");
//       navigate("/superadminDash/superadminproducts");
//     } catch {
//       toast.error("❌ Update failed");
//     }
//   };

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen">
//       <div className="max-w-4xl mx-auto">

//         <button
//           onClick={() => navigate("/superadminDash/superadminproducts")}
//           className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl p-8 shadow space-y-6"
//         >
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <Package /> Edit Product
//           </h1>

//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Product name"
//             className="input"
//           />
//           {errors.name && <p className="text-red-500">{errors.name}</p>}

//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="input h-24"
//           />

//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               name="price"
//               type="number"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="Price"
//               className="input"
//             />
//             <input
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Category"
//               className="input"
//             />
//           </div>

//           <input
//             name="features"
//             value={formData.features}
//             onChange={handleChange}
//             placeholder="Features (comma separated)"
//             className="input"
//           />

//           {/* IMAGE */}
//           {preview && (
//             <div className="relative w-48">
//               <img src={preview} className="rounded border" />
//               <button
//                 type="button"
//                 onClick={removeImage}
//                 className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
//               >
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           <label className="inline-flex items-center gap-2 cursor-pointer text-blue-600">
//             <Upload />
//             Upload Image
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleImageChange}
//             />
//           </label>

//           <button
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2"
//           >
//             {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
//             Update Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSuperProductsPrivateQuery,
  useUpdateSuperProductMutation,
} from "../redux/apis/superAdminProductApi";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Save,
  Upload,
  Package,
  Loader2,
  X,
} from "lucide-react";

export default function SuperAdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useGetSuperProductsPrivateQuery();
  const [updateProduct, { isLoading }] = useUpdateSuperProductMutation();

  const product = data?.products?.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    features: "",
    image: null, // ✅ FILE OBJECT
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        features: product.features?.join(", ") || "",
        image: null, // image only if changed
      });
      setPreview(product.image || "");
    }
  }, [product]);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(product?.image || "");
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name required";
    if (!formData.price || Number(formData.price) <= 0)
      e.price = "Valid price required";
    if (!formData.category.trim()) e.category = "Category required";
    if (!formData.description.trim()) e.description = "Description required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return toast.error("Fix form errors");

  const fd = new FormData();
  fd.append("name", formData.name);
  fd.append("description", formData.description);
  fd.append("price", formData.price);
  fd.append("category", formData.category);
  fd.append("features", formData.features);

  if (formData.image) {
    fd.append("image", formData.image); // 🔥 multer key
  }

  try {
    await updateProduct({ id, body: fd }).unwrap();
    toast.success("✅ Product updated");
    navigate("/superadminDash/superadminproducts");
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    toast.error("❌ Update failed");
  }
};

  if (isFetching || !product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate("/superadminDash/superadminproducts")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow space-y-6"
        >
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package /> Edit Product
          </h1>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            className="input"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="input h-24"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input"
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="input"
            />
          </div>

          <input
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="input"
          />

          {/* IMAGE */}
          {preview && (
            <div className="relative w-48">
              <img src={preview} className="rounded border" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <label className="inline-flex items-center gap-2 cursor-pointer text-blue-600">
            <Upload />
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
