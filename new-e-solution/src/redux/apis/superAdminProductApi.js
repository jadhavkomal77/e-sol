import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminProductApi = createApi({
  reducerPath: "superAdminProductApi",
  baseQuery: fetchBaseQuery({
      baseUrl:( import.meta.env.VITE_BACKEND_URL + "/api/superadminproducts") || "/api",
           baseUrl: import.meta.env.VITE_BACKEND_URL
     ?(import.meta.env.VITE_BACKEND_URL + "/api/superadminproducts") 
     : "/api/superadminproducts",
    credentials: "include",
  }),
  tagTypes: ["SuperProducts"],

  endpoints: (builder) => ({
    getSuperProductsPrivate: builder.query({
      query: () => "/",
      providesTags: ["SuperProducts"],
    }),

    addSuperProduct: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SuperProducts"],
    }),

   updateSuperProduct: builder.mutation({
  query: ({ id, data }) => ({
    url: `/${id}`,
    method: "PUT",
    body: data, // FormData
    // ❌ DO NOT add headers
  }),
  invalidatesTags: ["SuperProducts"],
}),


    deleteSuperProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperProducts"],
    }),

    // 🌍 PUBLIC SuperAdmin Website
    getSuperProductsPublic: builder.query({
      query: () => "/public",
      providesTags: ["SuperProducts"],
    }),
    getSuperSingleProductPublic: builder.query({
  query: (id) => `/public/${id}`,
}),
  }),
});

export const {
  useGetSuperProductsPrivateQuery,
  useAddSuperProductMutation,
  useUpdateSuperProductMutation,
  useDeleteSuperProductMutation,
  useGetSuperSingleProductPublicQuery,
  useGetSuperProductsPublicQuery,
} = superAdminProductApi;
