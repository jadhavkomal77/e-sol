
import { useState } from "react";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "../redux/apis/servicesApi";
import { toast } from "react-toastify";

const AdminAddService = () => {
  const { data, isLoading } = useGetAllServicesQuery();
  const [addService] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    features: "",
  });

  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setForm({ title: "", description: "", icon: "", features: "" });
    setEditId(null);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const payload = {
        title: form.title,
        description: form.description,
        icon: form.icon,
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      };

      if (editId) {
        await updateService({ id: editId, data: payload }).unwrap();
        toast.success("Service updated ✅");
        setModalOpen(false);
      } else {
        await addService(payload).unwrap();
        toast.success("Service added 🎉");
      }

      resetForm();
    } catch {
      toast.error("Operation failed ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id).unwrap();
      toast.success("Service deleted 🗑️");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading services...</p>;

  return (
    <div className="w-full px-3 sm:px-6 py-6 max-w-6xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Service Management
      </h1>

      {/* ================= ADD FORM ================= */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Add / Update Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* ICON INPUT (UPDATED) */}
          <div>
            <input
              className="border p-3 rounded-lg w-full"
              placeholder="Icon name (e.g. Camera, Shield, Cpu)"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter Lucide icon name (case-sensitive)
            </p>
          </div>

          <textarea
            className="border p-3 rounded-lg md:col-span-2 w-full"
            rows={3}
            placeholder="Service Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-lg md:col-span-2 w-full"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 bg-blue-600 hover:bg-blue-700
                     text-white px-8 py-3 rounded-xl font-semibold"
        >
          {saving ? "Saving..." : editId ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">All Services</h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Icon</th>
              <th className="p-3 text-left">Features</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.services?.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3">{item.icon}</td>
                <td className="p-3 text-sm text-gray-600">
                  {item.features.join(", ")}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditId(item._id);
                      setForm({
                        title: item.title,
                        description: item.description,
                        icon: item.icon,
                        features: item.features.join(", "),
                      });
                      setModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-4">
        {data?.services?.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">Icon: {item.icon}</p>
            <p className="text-sm text-gray-600 mt-1">
              {item.features.join(", ")}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditId(item._id);
                  setForm({
                    title: item.title,
                    description: item.description,
                    icon: item.icon,
                    features: item.features.join(", "),
                  });
                  setModalOpen(true);
                }}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold mb-4">Update Service</h2>

            <div className="space-y-3">
              <input
                className="border p-3 rounded-lg w-full"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                className="border p-3 rounded-lg w-full"
                placeholder="Icon name (Camera, Shield, Cpu)"
                value={form.icon}
                onChange={(e) =>
                  setForm({ ...form, icon: e.target.value })
                }
              />

              <textarea
                className="border p-3 rounded-lg w-full"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                className="border p-3 rounded-lg w-full"
                value={form.features}
                onChange={(e) =>
                  setForm({ ...form, features: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAddService;
