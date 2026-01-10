// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
// import { useAdminLoginMutation } from "../redux/apis/adminApi";
// import { motion } from "framer-motion";

// const AdminLogin = () => {
//   const [adminLogin, { isSuccess, isError, error, isLoading }] = useAdminLoginMutation();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: yup.object({
//       email: yup.string().email("Invalid email address").required("Enter Email"),
//       password: yup.string().required("Enter Password"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       adminLogin(values);
//       resetForm();
//     },
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/adminDash");
//     }
//   }, [isSuccess]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//           Admin Login
//         </h2>

//         {isError && (
//           <p className="text-red-500 text-center text-sm mb-4">
//             {error?.data?.message || "Login failed. Please try again."}
//           </p>
//         )}

//         <form onSubmit={formik.handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               {...formik.getFieldProps("email")}
//               className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
//                 formik.touched.email && formik.errors.email
//                   ? "border-red-500 focus:ring-red-300"
//                   : "border-gray-300 focus:ring-blue-400"
//               }`}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               {...formik.getFieldProps("password")}
//               className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
//                 formik.touched.password && formik.errors.password
//                   ? "border-red-500 focus:ring-red-300"
//                   : "border-gray-300 focus:ring-blue-400"
//               }`}
//             />
//             {formik.touched.password && formik.errors.password && (
//               <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-sm text-center text-gray-600 mt-3">
//                Don’t have an account?{" "}
//            <Link
//                to="/adminregister"
//                 className="text-blue-600 font-medium hover:underline"
//                >
//                 Register
//                </Link>
//                  </p>
        
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminLogin;





import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/apis/adminApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [
    adminLogin,
    { isSuccess, isError, error, isLoading },
  ] = useAdminLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email")
        .required("Email required"),
      password: yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      adminLogin(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful ✅");
      navigate("/adminDash");
    }

    if (isError) {
      toast.error(
        error?.data?.message || "Invalid email or password"
      );
    }
  }, [isSuccess, isError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Admin Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="admin@email.com"
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-blue-400 outline-none`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="••••••••"
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-blue-400 outline-none`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/adminregister"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
