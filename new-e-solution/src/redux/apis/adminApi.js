

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({

     baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/admin" || "/api",
    credentials: "include",

    prepareHeaders: (headers, { getState, endpoint }) => {
      const skipTokenEndpoints = ["adminLogin"];

      if (skipTokenEndpoints.includes(endpoint)) return headers;

      const token = getState().admin.admin?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Admin", "Products"],

  endpoints: (builder) => ({
  
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

  
    adminProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Admin"],
    }),


    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),


    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),

  
    getMyProducts: builder.query({
      query: () => "/my-products",
      providesTags: ["Products"],
    }),

    updateMyProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteMyProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    adminStats: builder.query({
      query: () => "/stats",
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
  useGetMyProductsQuery,
  useUpdateMyProductMutation,
  useDeleteMyProductMutation,
  useAdminStatsQuery,
} = adminApi;



