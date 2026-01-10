
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAddSuperProductMutation } from "../redux/apis/superAdminProductApi";
// import { toast } from "react-toastify";

// export default function SuperAdminAddProduct() {
//   const navigate = useNavigate();
//   const [addProduct] = useAddSuperProductMutation();

//   const [data, setData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     features: "",
//     image: "", // ✅ BASE64 IMAGE
//   });

//   const [preview, setPreview] = useState(null);

//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   /* ✅ FILE → BASE64 */
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setData((prev) => ({ ...prev, image: reader.result }));
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   /* ✅ JSON SUBMIT (NO FORM DATA) */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await addProduct({
//         ...data,
//         features: data.features
//           .split(",")
//           .map((f) => f.trim())
//           .filter(Boolean),
//       }).unwrap();

//       toast.success("✅ Product Added Successfully!");
//       navigate("/superadminDash/superadminproducts");
//     } catch (err) {
//       toast.error("❌ Error adding product");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="bg-blue-600 text-white p-6 rounded-xl shadow mb-8">
//         <h1 className="text-3xl font-bold">Add New Product</h1>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 max-w-3xl mx-auto shadow-lg rounded-xl space-y-5"
//       >
//         <input
//           name="name"
//           placeholder="Product Name"
//           required
//           onChange={handleChange}
//           className="input"
//         />

//         <textarea
//           name="description"
//           required
//           placeholder="Description"
//           onChange={handleChange}
//           className="input h-24"
//         />

//         <input
//           name="price"
//           type="number"
//           required
//           placeholder="Price ₹"
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="category"
//           placeholder="Category"
//           required
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="features"
//           placeholder="Features (comma separated)"
//           onChange={handleChange}
//           className="input"
//         />

//         {/* ✅ IMAGE */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="input"
//         />

//         {preview && (
//           <img
//             src={preview}
//             className="h-40 mt-2 rounded object-contain border"
//             alt="Preview"
//           />
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddSuperProductMutation } from "../redux/apis/superAdminProductApi";
import { toast } from "react-toastify";

const SuperAdminAddProduct = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddSuperProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    features: "",
    image: null, // ✅ FILE OBJECT
  });

  const [preview, setPreview] = useState("");

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- IMAGE CHANGE ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("category", formData.category);
    fd.append("features", formData.features);
    fd.append("image", formData.image); // 🔥 MUST MATCH multer key

    try {
      await addProduct(fd).unwrap();
      toast.success("✅ Product added successfully!");
      navigate("/superadminDash/superadminproducts");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          ➕ Add Super Admin Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Product name"
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Product description"
            className="w-full border rounded-lg px-3 py-2 h-24"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="file"
            name="image"           // 🔥 SAME KEY AS BACKEND
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-40 object-contain border rounded-lg"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SuperAdminAddProduct;
