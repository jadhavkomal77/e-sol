import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",

  baseQuery: fetchBaseQuery({
           baseUrl: import.meta.env.VITE_BACKEND_URL
     ?(import.meta.env.VITE_BACKEND_URL + "/api/payment") 
     : "/api/payment",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    /* ADMIN */
    getAdminPayment: builder.query({
      query: () => "/",
      providesTags: ["Payment"],
    }),

    upsertAdminPayment: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Payment"],
    }),

    /* PUBLIC */
    getPublicPayment: builder.query({
      query: (slug) => `/${slug}`,
    }),
  }),
});

export const {
  useGetAdminPaymentQuery,
  useUpsertAdminPaymentMutation,
  useGetPublicPaymentQuery,
} = paymentApi;
