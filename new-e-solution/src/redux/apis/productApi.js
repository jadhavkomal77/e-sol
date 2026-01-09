
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/products" || "/api",
    credentials: "include",

    prepareHeaders: (headers, { getState, endpoint }) => {
      const publicEndpoints = [
        "getPublicProducts",
        "getPublicSingleProduct",
      ];

      if (!publicEndpoints.includes(endpoint)) {
        const token = getState().admin.token; // ✅ FIX HERE
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    /* ================= ADMIN ================= */

    getProducts: builder.query({
      query: () => "/all",
      providesTags: ["Product"],
    }),

    getAdminSingleProduct: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    /* ================= PUBLIC ================= */

    getPublicProducts: builder.query({
      query: (slug) => `/public/${slug}`,
    }),

    getPublicSingleProduct: builder.query({
      query: ({ slug, id }) => `/public/${slug}/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAdminSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetPublicProductsQuery,
  useGetPublicSingleProductQuery,
} = productApi;
