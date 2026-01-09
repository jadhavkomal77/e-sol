import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminFooterApi = createApi({
  reducerPath: "superAdminFooterApi",
  baseQuery: fetchBaseQuery({

     baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/superadminfooter") || "/api",
    credentials: "include",
  }),
  tagTypes: ["SuperAdminFooter"],

  endpoints: (builder) => ({

    // 🔹 Load footer inside SuperAdmin Panel
    getSuperAdminFooter: builder.query({
      query: () => "/",
      providesTags: ["SuperAdminFooter"],
    }),

    // 🔹 Update data from SuperAdmin Panel
    updateSuperAdminFooter: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SuperAdminFooter"],
    }),

    // 🌍 Load footer for Public Main Website
    getPublicSuperAdminFooter: builder.query({
      query: () => "/public",
      providesTags: ["SuperAdminFooter"],
    }),

  }),
});


export const {
  useGetSuperAdminFooterQuery,
  useUpdateSuperAdminFooterMutation,
  useGetPublicSuperAdminFooterQuery,
} = superAdminFooterApi;
