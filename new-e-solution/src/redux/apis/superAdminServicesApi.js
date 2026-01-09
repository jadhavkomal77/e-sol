import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminServicesApi = createApi({
  reducerPath: "superAdminServicesApi",
  baseQuery: fetchBaseQuery({
      baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/superadminservices" )|| "/api",
    credentials: "include",
  }),
  tagTypes: ["SuperServices", "PublicServices"],

  endpoints: (builder) => ({
    /* 🔐 DASHBOARD PANEL */
    getSuperServicesPrivate: builder.query({
      query: () => "/",
      providesTags: ["SuperServices"],
      refetchOnMountOrArgChange: true,
    }),

    addSuperService: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SuperServices", "PublicServices"],
    }),

    updateSuperService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SuperServices", "PublicServices"],
    }),

    deleteSuperService: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperServices", "PublicServices"],
    }),

    /* 🌍 PUBLIC WEBSITE */
    getSuperServicesPublic: builder.query({
      query: () => "/public",
      providesTags: ["PublicServices"],
      refetchOnMountOrArgChange: false,
    }),

    getSuperServiceByIdPublic: builder.query({
      query: (id) => `/public/${id}`,
      providesTags: ["PublicServices"],
    }),
  }),
});

export const {
  useGetSuperServicesPrivateQuery,
  useAddSuperServiceMutation,
  useUpdateSuperServiceMutation,
  useDeleteSuperServiceMutation,
  useGetSuperServicesPublicQuery,
  useGetSuperServiceByIdPublicQuery
} = superAdminServicesApi;
