
import { useState } from "react";
import { useSuperAdminLoginMutation } from "../redux/apis/superAdminApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSuperAdmin } from "../redux/slices/superadminSlice";

export default function SuperAdminLogin() {
  const [login, { isLoading }] = useSuperAdminLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await login(form).unwrap();

      // ⭐ Save to Redux
      dispatch(
        setSuperAdmin({
          token: res.token,
          profile: res.superadmin, // this now exists (after backend fix)
        })
      );

      alert("SuperAdmin Logged In Successfully ✅");
      navigate("/superadminDash");

    } catch (error) {
      alert(error?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Super Admin Login
        </h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}

