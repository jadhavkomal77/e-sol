import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminNavbarApi = createApi({
  reducerPath: "superAdminNavbarApi",

  baseQuery: fetchBaseQuery({
     baseUrl: import.meta.env.VITE_BACKEND_URL
     ?(import.meta.env.VITE_BACKEND_URL + "/api/superadminnavbar") 
     : "/api",
    credentials: "include",
  }),

  tagTypes: ["SuperNavbar"],

  endpoints: (builder) => ({

    /* ================= SUPERADMIN PANEL ================= */

    // 🔐 GET navbar for superadmin
    getSuperNavbar: builder.query({
      query: () => "/",
      providesTags: ["SuperNavbar"],
    }),

    // 🔐 SAVE navbar
    saveSuperNavbar: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SuperNavbar"],
    }),

    /* ================= PUBLIC WEBSITE ================= */

    // 🌍 Public Navbar
    getPublicNavbar: builder.query({
      query: () => "/public",
    }),
  }),
});

export const {
  useGetSuperNavbarQuery,     // 🛡️ Superadmin → GET
  useSaveSuperNavbarMutation, // 🛡️ Superadmin → SAVE
  useGetPublicNavbarQuery,    // 🌍 Public → GET
} = superAdminNavbarApi;
