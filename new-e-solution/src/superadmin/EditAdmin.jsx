import React, { useState, useEffect } from "react";
import { useUpdateAdminMutation, useGetAllAdminsQuery } from "../redux/apis/superAdminApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetAllAdminsQuery();
  const existingAdmin = data?.admins?.find((a) => a._id === id);

  const [updateAdmin] = useUpdateAdminMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (existingAdmin) {
      setForm({
        name: existingAdmin.name,
        email: existingAdmin.email,
        phone: existingAdmin.phone,
        password: "",
      });
    }
  }, [existingAdmin]);

  const handleSubmit = async () => {
    try {
      await updateAdmin({ id, data: form }).unwrap();

      toast.success("Admin Updated Successfully!");
      navigate("/super-admin/admins");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl border">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Edit Admin
        </h2>

        <label className="text-sm font-semibold">Full Name</label>
        <input
          className="border p-3 w-full rounded-lg mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="text-sm font-semibold">Email</label>
        <input
          className="border p-3 w-full rounded-lg mb-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="text-sm font-semibold">Phone</label>
        <input
          className="border p-3 w-full rounded-lg mb-4"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label className="text-sm font-semibold">New Password (Optional)</label>
        <input
          type="password"
          className="border p-3 w-full rounded-lg mb-6"
          placeholder="Enter new password (optional)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Update Admin
        </button>

      </div>
    </div>
  );
}
