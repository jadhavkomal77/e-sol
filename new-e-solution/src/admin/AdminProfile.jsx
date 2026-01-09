

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "../redux/apis/adminApi";

const AdminProfile = () => {
  const { data, isLoading, isError, refetch } = useAdminProfileQuery();
  const [updateProfile] = useUpdateAdminProfileMutation();

  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [image, setImage] = useState(null);

  // Load existing profile data
  useEffect(() => {
    if (data?.admin) {
      setFormData({
        name: data.admin.name || "",
        email: data.admin.email || "",
        phone: data.admin.phone || "",
      });
    }
  }, [data]);

  // Input handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit (UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    if (image) fd.append("file", image);

    try {
      await updateProfile(fd).unwrap();
      toast.success("Profile updated successfully 🎉");
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading profile...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Failed to load admin profile.
      </div>
    );

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 pt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-xl bg-white/80 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-white/40"
      >
        {/* PROFILE CARD */}
        <div className="flex flex-col items-center text-center">
          <img
            src={
              data?.admin?.profile ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Admin Avatar"
            className="w-28 h-28 rounded-full shadow-lg border-4 border-indigo-400 mb-4 hover:scale-105 transition"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {data?.admin?.name}
          </h2>
          <p className="text-gray-500">{data?.admin?.email}</p>
          <p className="text-gray-500">{data?.admin?.phone}</p>

          <span className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            ADMINISTRATOR
          </span>
        </div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            ✏️ Edit Profile
          </button>
        </div>
      </motion.div>

      {/* ✨ MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-96"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Update Profile
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="text-gray-700 font-medium">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-gray-700 font-medium">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-gray-700 font-medium">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mt-1 text-sm"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
