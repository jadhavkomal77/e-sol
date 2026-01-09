// redux/apis/aboutApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/about") || "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    /* ===== ADMIN PANEL ===== */
    getAboutPage: builder.query({
      query: () => "/", // admin token based
    }),

    updateAboutPage: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
    }),

    /* ===== PUBLIC WEBSITE ===== */
    getPublicAboutPage: builder.query({
      query: (slug) => `/public/${slug}`,
    }),
  }),
});

export const {
  useGetAboutPageQuery,        // ✅ admin
  useUpdateAboutPageMutation, // ✅ admin
  useGetPublicAboutPageQuery, // ✅ public
} = aboutApi;
