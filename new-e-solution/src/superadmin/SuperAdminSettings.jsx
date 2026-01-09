import React, { useEffect, useState } from "react";
import {
  useGetSuperAdminProfileQuery,
  useUpdateSuperAdminProfileMutation,
} from "../redux/apis/superAdminApi";
import { toast } from "react-toastify";

export default function SuperAdminSettings() {
  const { data, isLoading } = useGetSuperAdminProfileQuery();
  const [updateProfile] = useUpdateSuperAdminProfileMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        ...form,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
      };

      // Optional password update
      if (form.oldPassword && form.newPassword) {
        payload.oldPassword = form.oldPassword;
        payload.newPassword = form.newPassword;
      }

      await updateProfile(payload).unwrap();

      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Update Failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        SuperAdmin Settings
      </h2>

      {/* Name */}
      <label className="font-semibold">Full Name</label>
      <input
        className="border p-3 w-full rounded mb-4"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* Email */}
      <label className="font-semibold">Email</label>
      <input
        className="border p-3 w-full rounded mb-4"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* Phone */}
      <label className="font-semibold">Phone</label>
      <input
        className="border p-3 w-full rounded mb-4"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      {/* Password Section */}
      <h3 className="text-xl font-semibold mt-6 mb-3">Change Password</h3>

      <label className="font-semibold">Old Password</label>
      <input
        type="password"
        className="border p-3 w-full rounded mb-3"
        placeholder="Enter old password"
        value={form.oldPassword}
        onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
      />

      <label className="font-semibold">New Password</label>
      <input
        type="password"
        className="border p-3 w-full rounded mb-6"
        placeholder="Enter new password"
        value={form.newPassword}
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
      />

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow"
      >
        Save Settings
      </button>
    </div>
  );
}
