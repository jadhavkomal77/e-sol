


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

  const { data } = useGetSuperProductsPrivateQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateSuperProductMutation();

  const product = data?.products?.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    features: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        features: product.features?.join(",") || "",
      });
      setPreview(product.image || "");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.image[0];
    if (image) {
      setImage(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(product?.image || "");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category.trim())
      newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("features", formData.features);
    form.append("status", true);

    if (image) {
      form.append("image", image);
    }

    try {
      await updateProduct({ id, data: form }).unwrap();
      toast.success("Product updated successfully!");
      navigate("/superadminDash/superadminproducts");
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#0051FF] animate-spin" />
      </div>
    );

  return (
    <div className="p-8 bg-[#F1F5F9] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/superadminDash/superadminproducts")}
            className="inline-flex items-center gap-2 text-[#6B7280] font-medium hover:text-[#0051FF] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/50">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-[12px] bg-[#0051FF]/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-[#0051FF]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Edit Product
                </h1>
                <p className="text-[#6B7280] font-medium mt-1">
                  Update product information and details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[20px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/50 space-y-6"
        >
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-[12px] border ${
                errors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#F1F5F9] focus:border-[#0051FF] focus:ring-[#0051FF]/20"
              } focus:outline-none focus:ring-4 transition-all text-slate-900 font-medium`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-medium mt-2">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className={`w-full px-4 py-3 rounded-[12px] border ${
                errors.description
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#F1F5F9] focus:border-[#0051FF] focus:ring-[#0051FF]/20"
              } focus:outline-none focus:ring-4 transition-all text-slate-900 font-medium resize-none`}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm font-medium mt-2">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 rounded-[12px] border ${
                  errors.price
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-[#F1F5F9] focus:border-[#0051FF] focus:ring-[#0051FF]/20"
                } focus:outline-none focus:ring-4 transition-all text-slate-900 font-medium`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm font-medium mt-2">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-[12px] border ${
                  errors.category
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-[#F1F5F9] focus:border-[#0051FF] focus:ring-[#0051FF]/20"
                } focus:outline-none focus:ring-4 transition-all text-slate-900 font-medium`}
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm font-medium mt-2">
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Features (comma separated)
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] border border-[#F1F5F9] focus:border-[#0051FF] focus:ring-4 focus:ring-[#0051FF]/20 focus:outline-none transition-all text-slate-900 font-medium"
              placeholder="Feature 1, Feature 2, Feature 3"
            />
            <p className="text-[#6B7280] text-sm font-medium mt-2">
              Separate multiple features with commas
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Image
            </label>

            {/* Preview */}
            {preview && (
              <div className="relative mb-4 inline-block">
                <div className="w-48 h-48 rounded-[16px] border-2 border-[#F1F5F9] overflow-hidden bg-gradient-to-br from-[#F1F5F9] to-white flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Upload Button */}
            <label className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-[#0051FF]/10 text-[#0051FF] font-semibold cursor-pointer hover:bg-[#0051FF]/20 transition-colors">
              <Upload className="w-5 h-5" />
              <span>{preview ? "Change Image" : "Upload Image"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/superadminDash/superadminproducts")}
              className="flex-1 px-6 py-3 rounded-[16px] border-2 border-[#F1F5F9] text-[#6B7280] font-semibold hover:bg-[#F1F5F9] active:scale-[0.98] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] bg-[#0051FF] text-white font-semibold hover:bg-[#0044DD] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(0,81,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,81,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}