

import { useState } from "react";
import { useSuperAdminRegisterMutation } from "../redux/apis/superAdminApi";
import { useNavigate } from "react-router-dom";

export default function SuperAdminRegister() {
  const [registerSuper, { isLoading }] = useSuperAdminRegisterMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields required!");
      return;
    }

    try {
      await registerSuper(form).unwrap();

      alert("Super Admin Created Successfully ✔");

      navigate("/superadminlogin");

    } catch (error) {
      alert(error?.data?.message || "Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Super Admin Registration
        </h2>

        {/* Full Name */}
        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Phone */}
        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Phone Number (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* Password */}
        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          {isLoading ? "Creating..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/superadminlogin")}
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
