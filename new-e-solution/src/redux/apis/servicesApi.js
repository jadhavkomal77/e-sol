

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",

  baseQuery: fetchBaseQuery({
       baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/services" || "/api",
    credentials: "include", // ⭐⭐⭐ MUST
  }),

  endpoints: (builder) => ({

    // PUBLIC
    getPublicServices: builder.query({
      query: (slug) => `/public/${slug}`,
    }),

  getPublicServiceById: builder.query({
  query: (id) => `/public/details/${id}`,
}),


    // ADMIN
    getAllServices: builder.query({
      query: () => `/all`,
    }),

    addService: builder.mutation({
      query: (body) => ({
        url: `/add`,
        method: "POST",
        body,
      }),
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});
export const {
  useGetPublicServicesQuery,
  useGetPublicServiceByIdQuery,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} = servicesApi;