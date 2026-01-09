// ✅ REQUIRED IMPORTS
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const superAdminPaymentApi = createApi({
  reducerPath: "superAdminPaymentApi",

  baseQuery: fetchBaseQuery({
     baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/payment" || "/api",
    credentials: "include",
  }),

  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    /* ================= PUBLIC ================= */
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (body) => ({
        url: "/verify",
        method: "POST",
        body,
      }),
    }),

    /* ================= SUPERADMIN ================= */
    getAllPayments: builder.query({
      query: () => "/all",
      providesTags: ["Payment"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetAllPaymentsQuery,
} = superAdminPaymentApi;
