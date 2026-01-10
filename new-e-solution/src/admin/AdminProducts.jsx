

import { useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/apis/productApi";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  const products = data?.products || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          onClick={() => navigate("/adminDash/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow p-4 border hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-contain mb-3"
              />

              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>

              <p className="font-bold text-blue-600 mt-2">
                ₹{product.price}
              </p>

              <div className="flex gap-2 mt-4">
                {/* <button
                  onClick={() =>
                    navigate(`/adminDash/edit-product/${product._id}`)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button> */}
<button
  onClick={() =>
   navigate(`/adminDash/edit-product/${product._id}`)
  }
  className="bg-yellow-500 text-white px-3 py-1 rounded"
>
  Edit
</button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;




















// // client/src/pages/admin/AddProduct.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAddProductMutation } from "../redux/apis/productApi";
// import { uploadToCloudinary, uploadMultipleToCloudinary } from "../utils/cloudinaryUpload";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const { token, admin } = useSelector((state) => state.admin);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: "",
//     features: "",
//     image: null, // File object
//     images: [], // Multiple files
//   });

//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   // Handle single image
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrls([reader.result]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle multiple images
//   const handleMultipleImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setFormData({ ...formData, images: files });
      
//       // Create preview URLs
//       const readers = files.map((file) => {
//         return new Promise((resolve) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.readAsDataURL(file);
//         });
//       });

//       Promise.all(readers).then((urls) => {
//         setPreviewUrls(urls);
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     try {
//       let imageUrl = "";
//       let imageUrls = [];

//       // Upload single image if provided
//       if (formData.image) {
//         imageUrl = await uploadToCloudinary(formData.image, admin._id, token);
//       }

//       // Upload multiple images if provided
//       if (formData.images.length > 0) {
//         imageUrls = await uploadMultipleToCloudinary(
//           formData.images,
//           admin._id,
//           token
//         );
//       }

//       // Prepare product data with Cloudinary URLs
//       const productData = {
//         name: formData.name,
//         description: formData.description,
//         category: formData.category,
//         price: formData.price,
//         features: formData.features,
//         image: imageUrl || (imageUrls.length > 0 ? imageUrls[0] : ""),
//         images: imageUrls.length > 0 ? imageUrls : (imageUrl ? [imageUrl] : []),
//       };

//       // Send to backend (only URLs, no files)
//       await addProduct(productData).unwrap();
      
//       toast.success("Product added successfully!");
//       navigate("/adminDash/products");
//     } catch (error) {
//       console.error("Upload/Submit error:", error);
//       toast.error(error?.data?.message || "Failed to add product");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Product Name */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Product Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Description</label>
//           <textarea
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//             rows="4"
//             required
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Category</label>
//           <input
//             type="text"
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Price</label>
//           <input
//             type="number"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData({ ...formData, price: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         {/* Single Image Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Main Image (Single)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         {/* Multiple Images Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Additional Images (Multiple)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleMultipleImagesChange}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         {/* Image Previews */}
//         {previewUrls.length > 0 && (
//           <div className="grid grid-cols-3 gap-4">
//             {previewUrls.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`Preview ${index + 1}`}
//                 className="w-full h-32 object-cover rounded-lg"
//               />
//             ))}
//           </div>
//         )}

//         {/* Features */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Features (comma-separated)
//           </label>
//           <input
//             type="text"
//             value={formData.features}
//             onChange={(e) =>
//               setFormData({ ...formData, features: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//             placeholder="Feature 1, Feature 2, Feature 3"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={uploading || isLoading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
//         >
//           {uploading ? "Uploading Images..." : isLoading ? "Adding Product..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;