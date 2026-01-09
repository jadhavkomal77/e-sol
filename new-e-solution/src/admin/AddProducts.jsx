
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../redux/apis/productApi";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    features: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ===== HANDLE INPUT ===== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===== IMAGE ===== */
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    setImage(img || null);
    if (img) setPreview(URL.createObjectURL(img));
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("features", formData.features);

    if (image) form.append("image", image); // ✅ multer expects "image"

    try {
      await addProduct(form).unwrap();
      toast.success("✅ Product added successfully!");
      navigate("/adminDash/adminproducts");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">➕ Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
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

          {/* ✅ CATEGORY = FREE TEXT */}
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Category (e.g. CCTV, Networking, Smart Devices)"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 object-contain border rounded-lg"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

