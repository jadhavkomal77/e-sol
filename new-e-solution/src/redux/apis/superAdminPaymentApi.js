import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminPaymentApi = createApi({
  reducerPath: "superAdminPaymentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/superadminpayment"
      : "/api/superadminpayment",
    credentials: "include",
  }),

  tagTypes: ["SuperAdminPayment"],

  endpoints: (builder) => ({
    /* 🔐 SUPERADMIN */
    getSuperAdminPayment: builder.query({
      query: () => "/",
      providesTags: ["SuperAdminPayment"],
    }),

    upsertSuperAdminPayment: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SuperAdminPayment"],
    }),

    getAllSuperAdminPayments: builder.query({
      query: () => "/all",
    }),

    /* 🌍 PUBLIC */
    getSuperAdminPublicPayment: builder.query({
      query: () => "/public",
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/create-order",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSuperAdminPaymentQuery,
  useUpsertSuperAdminPaymentMutation,
  useGetAllSuperAdminPaymentsQuery,
  useGetSuperAdminPublicPaymentQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = superAdminPaymentApi;
