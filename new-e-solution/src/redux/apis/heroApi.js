import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/hero" || "/api",
    credentials: "include", 
  }),
  tagTypes: ["Hero"],

  endpoints: (builder) => ({

    /* ===========================
       🔐 ADMIN APIs
    ============================ */

    // Admin → get own hero
    getAdminHero: builder.query({
      query: () => "/admin",
      providesTags: ["Hero"],
    }),

    // Admin → add / update hero
    saveHero: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),

    // Admin → delete hero
    deleteHero: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),


// Public → get hero
getPublicHero: builder.query({
  query: (slug) => `/public/${slug}`,
  providesTags: ["Hero"],
}),


  }),
  
});

export const {
  useGetAdminHeroQuery,
  useSaveHeroMutation,
  useDeleteHeroMutation,
  useGetPublicHeroQuery,
} = heroApi;
