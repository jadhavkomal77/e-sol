

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminApi = createApi({
  reducerPath: "superAdminApi",

  baseQuery: fetchBaseQuery({
       baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/superadmin" )|| "/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
  const token = getState().superadmin?.token;
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
},
  }),

  tagTypes: ["Admin", "Profile"],

  endpoints: (builder) => ({

    /* ======================================================
       ⭐ AUTH
    ====================================================== */
    superAdminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    superAdminRegister: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    superAdminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

   
    getSuperAdminProfile: builder.query({
      query: () => `/profile`,
      providesTags: ["Profile"],
    }),

    updateSuperAdminProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    /* ======================================================
       ⭐ ADMIN CRUD
    ====================================================== */

    // ✔ GET ALL ADMINS
    getAllAdmins: builder.query({
      query: () => `/admins`,
      providesTags: ["Admin"],
    }),

    // ✔ CREATE ADMIN
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // ✔ UPDATE ADMIN
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // ✔ DELETE ADMIN
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    // ✔ TOGGLE ADMIN STATUS
    toggleAdminStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/toggle/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin"],
    }),

    /* ======================================================
       ⭐ ASSIGN SYSTEM (PRODUCTS & SERVICES)
    ====================================================== */
    assignToAdmin: builder.mutation({
      query: (data) => ({
        url: "/assign",
        method: "POST",
        body: data, // { adminId, productIds, serviceIds }
      }),
    }),

  }),
});

export const {
  useSuperAdminLoginMutation,
  useSuperAdminRegisterMutation,
  useSuperAdminLogoutMutation,

  useGetSuperAdminProfileQuery,
  useUpdateSuperAdminProfileMutation,

  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useToggleAdminStatusMutation,

  useAssignToAdminMutation,
} = superAdminApi;
