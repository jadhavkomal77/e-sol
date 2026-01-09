

import React, { useState } from "react";
import { useCreateAdminMutation } from "../redux/apis/superAdminApi";
import { toast } from "react-toastify";

export default function CreateAdmin() {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    websiteSlug: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.websiteSlug
    ) {
      toast.error("All fields including Website Slug are required!");
      return;
    }

    try {
      await createAdmin(form).unwrap();
      toast.success("🎉 Admin Created Successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        websiteSlug: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create admin");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl border border-gray-200">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create New Admin
        </h2>

        {/* Name */}
        <label className="text-sm font-semibold text-gray-600">
          Full Name
        </label>
        <input
          className="border p-3 w-full rounded-lg mb-4"
          placeholder="Enter admin name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {/* Email */}
        <label className="text-sm font-semibold text-gray-600">
          Email
        </label>
        <input
          type="email"
          className="border p-3 w-full rounded-lg mb-4"
          placeholder="Enter admin email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {/* Phone */}
        <label className="text-sm font-semibold text-gray-600">
          Phone
        </label>
        <input
          className="border p-3 w-full rounded-lg mb-4"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        {/* Website Slug */}
        <label className="text-sm font-semibold text-gray-600">
          Website Slug
        </label>
        <input
          className="border p-3 w-full rounded-lg mb-1"
          placeholder="eg: smart-solution"
          value={form.websiteSlug}
          onChange={(e) =>
            handleChange(
              "websiteSlug",
              e.target.value.toLowerCase().replace(/\s+/g, "-")
            )
          }
        />
        <p className="text-xs text-gray-500 mb-4">
          Website URL:
          <b className="ml-1">
            myplatform.com/site/{form.websiteSlug || "your-slug"}
          </b>
        </p>

        {/* Password */}
        <label className="text-sm font-semibold text-gray-600">
          Password
        </label>
        <input
          type="password"
          className="border p-3 w-full rounded-lg mb-6"
          placeholder="Create password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
        >
          {isLoading ? "Creating..." : "Create Admin"}
        </button>
      </div>
    </div>
  );
}

