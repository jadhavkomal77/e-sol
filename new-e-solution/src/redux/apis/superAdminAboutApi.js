import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminAboutApi = createApi({
  reducerPath: "superAdminAboutApi",
  baseQuery: fetchBaseQuery({
       baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/superabout" )|| "/api",
    credentials: "include",
  }),
  tagTypes: ["SuperAbout", "PublicAbout"],

  endpoints: (builder) => ({
    // 🔐 Super Admin Private Panel
    getSuperAboutPrivate: builder.query({
      query: () => `/`,
      providesTags: ["SuperAbout"],
      refetchOnMountOrArgChange: true,
    }),

    saveSuperAbout: builder.mutation({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SuperAbout", "PublicAbout"],
    }),

    deleteSuperAbout: builder.mutation({
      query: () => ({
        url: `/`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperAbout", "PublicAbout"],
    }),

    // 🌍 Public Website Access
    getSuperAboutPublic: builder.query({
      query: () => `/public`,
      providesTags: ["PublicAbout"],
      refetchOnMountOrArgChange: false,
    }),
  }),
});

export const {
  useGetSuperAboutPrivateQuery,
  useSaveSuperAboutMutation,
  useDeleteSuperAboutMutation,
  useGetSuperAboutPublicQuery,
} = superAdminAboutApi;
