
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetAdminSingleProductQuery,
//   useUpdateProductMutation,
// } from "../redux/apis/productApi";
// import { toast } from "react-toastify";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading, isError } =
//     useGetAdminSingleProductQuery(id);

//   const [updateProduct] = useUpdateProductMutation();
//   const product = data?.product;

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     features: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         category: product.category,
//         features: product.features?.join(",") || "",
//       });
//       setPreview(product.image);
//     }
//   }, [product]);

//   if (isLoading)
//     return <p className="text-center mt-20">Loading product...</p>;

//   if (isError || !product)
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center">
//         <p className="text-red-600 text-lg mb-4">Product not found</p>
//         <button
//           onClick={() => navigate("/adminDash/adminproducts")}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//         >
//           Back to Products
//         </button>
//       </div>
//     );

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     Object.entries(formData).forEach(([k, v]) =>
//       form.append(k, v)
//     );
//     if (image) form.append("image", image);

//     try {
//       await updateProduct({ id, formData: form }).unwrap();
//       toast.success("✅ Product updated successfully");
//       navigate("/adminDash/adminproducts");
//     } catch {
//       toast.error("❌ Update failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//           placeholder="Product name"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <textarea
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           placeholder="Description"
//           className="w-full border p-2 rounded h-24"
//           required
//         />

//         <input
//           type="number"
//           value={formData.price}
//           onChange={(e) =>
//             setFormData({ ...formData, price: e.target.value })
//           }
//           placeholder="Price"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           value={formData.category}
//           onChange={(e) =>
//             setFormData({ ...formData, category: e.target.value })
//           }
//           placeholder="Category"
//           className="w-full border p-2 rounded"
//         />

//         <input
//           value={formData.features}
//           onChange={(e) =>
//             setFormData({ ...formData, features: e.target.value })
//           }
//           placeholder="Features (comma separated)"
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             setImage(e.target.files[0]);
//             setPreview(URL.createObjectURL(e.target.files[0]));
//           }}
//         />

//         {preview && (
//           <img
//             src={preview}
//             className="h-40 object-contain border rounded"
//           />
//         )}

//         <button className="bg-blue-600 text-white px-6 py-2 rounded">
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAdminSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/apis/productApi";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetAdminSingleProductQuery(id);

  const [updateProduct, { isLoading: updating }] =
    useUpdateProductMutation();

  const product = data?.product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    features: "",
    image: null, // FILE
  });

  const [preview, setPreview] = useState("");

  /* ===== LOAD PRODUCT ===== */
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        features: product.features?.join(",") || "",
        image: null, // new image optional
      });
      setPreview(product.image);
    }
  }, [product]);

  if (isLoading)
    return <p className="text-center mt-20">Loading product...</p>;

  if (isError || !product)
    return <p className="text-center text-red-600">Product not found</p>;

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("category", formData.category);
    fd.append("features", formData.features);

    // 🔥 image only if changed
    if (formData.image) {
      fd.append("image", formData.image);
    }

    try {
      await updateProduct({ id, formData: fd }).unwrap();
      toast.success("✅ Product updated successfully");
      navigate("/adminDash/adminproducts");
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name}
          onChange={handleChange} className="w-full border p-2 rounded" />

        <textarea name="description" value={formData.description}
          onChange={handleChange} className="w-full border p-2 rounded h-24" />

        <input type="number" name="price" value={formData.price}
          onChange={handleChange} className="w-full border p-2 rounded" />

        <input name="category" value={formData.category}
          onChange={handleChange} className="w-full border p-2 rounded" />

        <input name="features" value={formData.features}
          onChange={handleChange}
          className="w-full border p-2 rounded" />

        <input
          type="file"
          name="image"      // 🔥 MUST MATCH multer.single("image")
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <img src={preview} className="h-40 object-contain border rounded" />
        )}

        <button disabled={updating}
          className="bg-blue-600 text-white px-6 py-2 rounded">
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}



















// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetAdminSingleProductQuery,
//   useUpdateProductMutation,
// } from "../redux/apis/productApi";
// import { toast } from "react-toastify";

// const AdminEditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading } = useGetAdminSingleProductQuery(id);
//   const [updateProduct, { isLoading: updating }] =
//     useUpdateProductMutation();

//   const product = data?.product;

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       category: "",
//       price: "",
//       features: "", // ✅ NEW
//       image: null,
//     },

//     validationSchema: Yup.object({
//       name: Yup.string().required("Name required"),
//       description: Yup.string().required("Description required"),
//       category: Yup.string().required("Category required"),
//       price: Yup.number().positive().required("Price required"),
//       features: Yup.string(),
//     }),

//     onSubmit: async (values) => {
//       try {
//         const fd = new FormData();
//         fd.append("name", values.name);
//         fd.append("description", values.description);
//         fd.append("category", values.category);
//         fd.append("price", values.price);
//         fd.append("features", values.features); // ✅ NEW

//         if (values.image) {
//           fd.append("image", values.image);
//         }

//         await updateProduct({ id, data: fd }).unwrap();

//         toast.success("Product updated");
//         navigate("/admin/products");
//       } catch (err) {
//         toast.error(err?.data?.message || "Update failed");
//       }
//     },
//   });

//   useEffect(() => {
//     if (product) {
//       formik.setValues({
//         name: product.name || "",
//         description: product.description || "",
//         category: product.category || "",
//         price: product.price || "",
//         features: Array.isArray(product.features)
//           ? product.features.join(", ")
//           : "",
//         image: null,
//       });
//     }
//   }, [product]);

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4 text-center">
//         Admin – Edit Product
//       </h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <textarea
//           name="description"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           name="category"
//           value={formik.values.category}
//           onChange={formik.handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="number"
//           name="price"
//           value={formik.values.price}
//           onChange={formik.handleChange}
//           className="w-full p-2 border rounded"
//         />

//         {/* ✅ FEATURES */}
//         <input
//           name="features"
//           placeholder="Features (comma separated)"
//           value={formik.values.features}
//           onChange={formik.handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) =>
//             formik.setFieldValue("image", e.currentTarget.files[0])
//           }
//           className="w-full p-2 border rounded"
//         />

//         <button
//           type="submit"
//           disabled={updating}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {updating ? "Updating..." : "Update Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminEditProduct;
