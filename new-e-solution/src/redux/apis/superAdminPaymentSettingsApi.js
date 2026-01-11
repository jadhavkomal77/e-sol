// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const superAdminPaymentApi = createApi({
//   reducerPath: "superAdminPaymentApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BACKEND_URL
//       ? import.meta.env.VITE_BACKEND_URL + "/api/superadmin/payment"
//       : "/api/superadmin/payment",
//     credentials: "include",
//   }),

//   tagTypes: ["SuperAdminPayment"],

//   endpoints: (builder) => ({
//     /* 🔐 SUPERADMIN */
//     getPaymentSettings: builder.query({
//       query: () => "/public", // same settings, but public-safe
//       providesTags: ["SuperAdminPayment"],
//     }),

//     upsertPaymentSettings: builder.mutation({
//       query: (formData) => ({
//         url: "/",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["SuperAdminPayment"],
//     }),

//     getAllPayments: builder.query({
//       query: () => "/all",
//     }),

//     /* 🌍 PUBLIC */
//     getPublicPayment: builder.query({
//       query: () => "/public",
//     }),

//     createOrder: builder.mutation({
//       query: (data) => ({
//         url: "/create-order",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     verifyPayment: builder.mutation({
//       query: (data) => ({
//         url: "/verify",
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetPaymentSettingsQuery,
//   useUpsertPaymentSettingsMutation,
//   useGetAllPaymentsQuery,
//   useGetPublicPaymentQuery,
//   useCreateOrderMutation,
//   useVerifyPaymentMutation,
// } = superAdminPaymentApi;
