
import React from "react";
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
} from "../redux/apis/contactApi";
import { Trash2, Mail, Phone, User, Calendar } from "lucide-react";
import { toast } from "react-toastify";

export default function ContactList() {
  // 🔹 NOW data itself is contacts array
  const { data: contacts = [], isLoading, isError } =
    useGetAllContactsQuery();

  const [deleteContact, { isLoading: deleting }] =
    useDeleteContactMutation();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await deleteContact(id).unwrap();
      toast.success("Contact deleted successfully 🗑️");
    } catch (err) {
      toast.error("Failed to delete contact ❌");
    }
  };

  /* ================= STATES ================= */

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500 text-lg">
        Loading contacts...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-500 text-lg">
        Failed to load contacts
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">📩 Contact Messages</h1>
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <p className="text-xl text-gray-600">No messages found</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📩 Contact Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User size={18} />
                {item.name}
              </h2>

              <button
                onClick={() => handleDelete(item._id)}
                disabled={deleting}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="mt-3 space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                {item.email}
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} className="text-green-600" />
                {item.phone}
              </p>

              <p className="flex items-center gap-2 text-purple-600 font-medium">
                🔧 Service Required: {item.service || "N/A"}
              </p>

              <p className="bg-gray-100 p-3 rounded-lg text-sm">
                {item.message}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={15} />
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
