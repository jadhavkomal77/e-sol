// redux/apis/navbarApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const navbarApi = createApi({
  reducerPath: "navbarApi",
  baseQuery: fetchBaseQuery({
           baseUrl: import.meta.env.VITE_BACKEND_URL
     ?(import.meta.env.VITE_BACKEND_URL + "/api/navbar") 
     : "/api/navbar",
    credentials: "include",
  }),
  tagTypes: ["Navbar"],
  endpoints: (builder) => ({

    /* ================= ADMIN PANEL ================= */

    // 🔐 GET navbar for logged-in admin
    getNavbar: builder.query({
      query: () => "/",
      providesTags: ["Navbar"],
    }),

    // 🔐 SAVE / UPDATE navbar
    saveNavbar: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Navbar"],
    }),

    /* ================= PUBLIC WEBSITE ================= */

    // 🌍 Public navbar by slug
    getPublicNavbar: builder.query({
      query: (slug) => `/public/${slug}`,
    }),
  }),
});

export const {
  useGetNavbarQuery,        // ✅ ADMIN GET
  useSaveNavbarMutation,   // ✅ ADMIN SAVE
  useGetPublicNavbarQuery, // ✅ PUBLIC
} = navbarApi;
