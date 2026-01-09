import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminHeroApi = createApi({
  reducerPath: "superAdminHeroApi",
  baseQuery: fetchBaseQuery({
     baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/superhero") || "/api",
    credentials: "include",
  }),
  tagTypes: ["SuperAdminHero"],

  endpoints: (builder) => ({
   // SuperAdmin Dashboard Hero
getSuperAdminHeroPrivate: builder.query({
  query: () => "/",
  providesTags: ["SuperAdminHero"],
}),

saveSuperAdminHero: builder.mutation({
  query: (data) => ({
    url: "/",
    method: "PUT",
    body: data,
  }),
  invalidatesTags: ["SuperAdminHero"],
}),

// Public Hero Data
getSuperAdminHeroPublic: builder.query({
  query: () => "/public",
}),

  })
});

export const {
  useGetSuperAdminHeroPrivateQuery,
  useSaveSuperAdminHeroMutation,
  useGetSuperAdminHeroPublicQuery,
} = superAdminHeroApi;
