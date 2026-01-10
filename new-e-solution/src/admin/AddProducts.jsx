
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
    image: null,
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("category", formData.category);
    fd.append("features", formData.features);
    fd.append("image", formData.image); // 🔥 MULTER KEY

    try {
      await addProduct(fd).unwrap();
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

          <input name="name" value={formData.name} onChange={handleChange}
            required placeholder="Product name"
            className="w-full border rounded-lg px-3 py-2" />

          <textarea name="description" value={formData.description}
            onChange={handleChange} required placeholder="Product description"
            className="w-full border rounded-lg px-3 py-2 h-24" />

          <input type="number" name="price" value={formData.price}
            onChange={handleChange} required placeholder="Price"
            className="w-full border rounded-lg px-3 py-2" />

          <input name="category" value={formData.category}
            onChange={handleChange} required placeholder="Category"
            className="w-full border rounded-lg px-3 py-2" />

          <input name="features" value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="w-full border rounded-lg px-3 py-2" />

          <input
            type="file"
            name="image"            // 🔥 IMPORTANT
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />

          {preview && (
            <img src={preview} className="h-40 object-contain border rounded-lg" />
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
