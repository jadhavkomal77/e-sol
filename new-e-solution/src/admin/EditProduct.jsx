
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

  const [updateProduct] = useUpdateProductMutation();
  const product = data?.product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    features: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        features: product.features?.join(",") || "",
      });
      setPreview(product.image);
    }
  }, [product]);

  if (isLoading)
    return <p className="text-center mt-20">Loading product...</p>;

  if (isError || !product)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg mb-4">Product not found</p>
        <button
          onClick={() => navigate("/adminDash/adminproducts")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Back to Products
        </button>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      form.append(k, v)
    );
    if (image) form.append("image", image);

    try {
      await updateProduct({ id, formData: form }).unwrap();
      toast.success("✅ Product updated successfully");
      navigate("/adminDash/adminproducts");
    } catch {
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="Product name"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
          className="w-full border p-2 rounded h-24"
          required
        />

        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <input
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        <input
          value={formData.features}
          onChange={(e) =>
            setFormData({ ...formData, features: e.target.value })
          }
          placeholder="Features (comma separated)"
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img
            src={preview}
            className="h-40 object-contain border rounded"
          />
        )}

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
