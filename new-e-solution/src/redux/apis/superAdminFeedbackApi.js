import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminFeedbackApi = createApi({
  reducerPath: "superAdminFeedbackApi",
  baseQuery: fetchBaseQuery({
 
       baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/superadminfeedback" )|| "/api",
    credentials: "include",
  }),
  tagTypes: ["SuperAdminFeedback"],

  endpoints: (builder) => ({

    /* 🌍 PUBLIC — Create Feedback */
    createFeedback: builder.mutation({
      query: (data) => ({
        url: `/public`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SuperAdminFeedback"],
    }),

    /* 🌍 PUBLIC — Fetch Only Resolved Feedback */
    getPublicFeedback: builder.query({
      query: () => `/public`,
      providesTags: ["SuperAdminFeedback"],
    }),

    /* 🔐 ADMIN — Fetch All Feedback */
    getDashboardFeedback: builder.query({
      query: () => `/`,
      providesTags: ["SuperAdminFeedback"],
    }),

    /* 🔐 ADMIN — Update Status */
    updateFeedbackStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["SuperAdminFeedback"],
    }),

    /* 🔐 ADMIN — Delete Feedback */
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperAdminFeedback"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetPublicFeedbackQuery,
  useGetDashboardFeedbackQuery,
  useUpdateFeedbackStatusMutation,
  useDeleteFeedbackMutation,
} = superAdminFeedbackApi;
