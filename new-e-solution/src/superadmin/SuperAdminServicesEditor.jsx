
import { useState } from "react";
import * as Icons from "lucide-react";
import { toast } from "react-toastify";

import {
  useAddSuperServiceMutation,
  useDeleteSuperServiceMutation,
  useGetSuperServicesPrivateQuery,
  useUpdateSuperServiceMutation,
} from "../redux/apis/superAdminServicesApi";

export default function SuperAdminServicesEditor() {
  const { data, isLoading, refetch } = useGetSuperServicesPrivateQuery();
  const [addService] = useAddSuperServiceMutation();
  const [updateService] = useUpdateSuperServiceMutation();
  const [deleteService] = useDeleteSuperServiceMutation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    features: "",
  });

  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= HELPERS ================= */

  const resetForm = () => {
    setForm({ title: "", description: "", icon: "", features: "" });
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return toast.error("Title required");
    if (!form.description.trim()) return toast.error("Description required");

    const payload = {
      title: form.title,
      description: form.description,
      icon: form.icon || "Settings",
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      setSaving(true);

      if (editId) {
        await updateService({ id: editId, data: payload }).unwrap();
        toast.success("Service updated successfully ✅");
      } else {
        await addService(payload).unwrap();
        toast.success("Service added successfully ✅");
      }

      resetForm();
      setModalOpen(false);
      refetch();
    } catch {
      toast.error("Operation failed ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setEditId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join(", "),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this service?")) return;
    await deleteService(id).unwrap();
    toast.success("Service deleted 🗑");
    refetch();
  };

  if (isLoading) {
    return <p className="text-center p-10">Loading services...</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SuperAdmin Services</h1>
        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          + Add Service
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Icon</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.services?.map((s) => {
              const Icon = Icons[s.icon] || Icons.Settings;

              return (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  {/* ICON */}
                  <td className="p-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </td>

                  {/* TITLE */}
                  <td className="p-3 font-medium">{s.title}</td>

                  {/* DESCRIPTION ✅ */}
                  <td className="p-3 text-sm text-gray-600 max-w-md">
                    {s.description}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data?.services?.length === 0 && (
          <p className="text-center text-gray-500 p-6">
            No services found
          </p>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-lg rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Update Service" : "Add Service"}
            </h2>

            <input
              className="border p-3 rounded-lg w-full mb-3"
              placeholder="Service Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="border p-3 rounded-lg w-full mb-3"
              placeholder="Service Description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              className="border p-3 rounded-lg w-full mb-3"
              placeholder="Icon name (Camera, Shield, Zap)"
              value={form.icon}
              onChange={(e) =>
                setForm({ ...form, icon: e.target.value })
              }
            />

            <input
              className="border p-3 rounded-lg w-full"
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={(e) =>
                setForm({ ...form, features: e.target.value })
              }
            />

            <div className="flex gap-3 mt-5">
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
                {saving ? "Saving..." : editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
