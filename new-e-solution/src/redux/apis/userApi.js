import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/users" || "/api",
    credentials: "include", // ✅ allows cookies for protected routes
    prepareHeaders: (headers, { getState }) => {
      // Optional: add Authorization header if using Bearer token
      const token = getState().auth?.token; // if you store token in Redux
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // ✅ Register
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Login
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Get Profile (protected route)
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"],
    }),

    // ✅ Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useLogoutUserMutation, 
} = userApi;
