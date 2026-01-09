import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
 
     baseUrl: import.meta.env.VITE_BACKEND_URL
          ?(import.meta.env.VITE_BACKEND_URL + "/api/feedback") 
          : "/api/feedback",
    credentials: "include",
  }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({

    /* ================= PUBLIC ================= */
    // ⭐ slug REQUIRED
    createFeedback: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/public/${slug}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    /* ================= USER ================= */
    getMyFeedbacks: builder.query({
      query: () => "/my",
      providesTags: ["Feedback"],
    }),

    /* ================= ADMIN ================= */
    getAllFeedbacks: builder.query({
      query: () => "/",
      providesTags: ["Feedback"],
    }),
updateFeedbackStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/${id}/status`,
    method: "PATCH",
    body: { status },
  }),
  invalidatesTags: ["Feedback"],
}),

    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetMyFeedbacksQuery,
  useGetAllFeedbacksQuery,useUpdateFeedbackStatusMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
