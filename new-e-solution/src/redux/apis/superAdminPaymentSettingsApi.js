import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminPaymentSettingsApi = createApi({
  reducerPath: "superAdminPaymentSettingsApi",
  baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/superadminpaymentsetting" || "/api",
    credentials: "include",
  }),
  tagTypes: ["PaymentSettings"],

  endpoints: (builder) => ({
    /* PUBLIC */
    getPublicPayment: builder.query({
      query: () => "/public",
    }),

    /* SUPERADMIN */
    updatePaymentSettings: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PaymentSettings"],
    }),
  }),
});

export const {
  useGetPublicPaymentQuery,
  useUpdatePaymentSettingsMutation,
} = superAdminPaymentSettingsApi;
