import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddSuperProductMutation } from "../redux/apis/superAdminProductApi";
import { toast } from "react-toastify";

export default function SuperAdminAddProduct() {
  const navigate = useNavigate();
  const [addProduct] = useAddSuperProductMutation();

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    features: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(data).forEach((key) => form.append(key, data[key]));
    if (image) form.append("image", image);


    try {
      await addProduct(form).unwrap();
      toast.success("Product Added Successfully!");
      navigate("/superadminDash/superadminproducts");
    } catch {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 max-w-3xl mx-auto shadow-lg rounded-xl space-y-5"
      >
        <input name="name" placeholder="Product Name" required onChange={handleChange}
          className="input" />
        <textarea name="description" required placeholder="Description"
          onChange={handleChange} className="input h-24" />
        <input name="price" type="number" required placeholder="Price ₹"
          onChange={handleChange} className="input" />
        <input name="category" placeholder="Category" required
          onChange={handleChange} className="input" />
        <input name="features" placeholder="Features (comma separated)"
          onChange={handleChange} className="input" />

        <input type="file" accept="image/*"
          onChange={handleImageChange} className="input" />
        {preview && <img src={preview} className="h-40 mt-2 rounded" />}

        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
