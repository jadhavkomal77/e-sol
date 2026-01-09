

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


