import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminEnquiryApi = createApi({
  reducerPath: "superAdminEnquiryApi",

  baseQuery: fetchBaseQuery({
         baseUrl: import.meta.env.VITE_BACKEND_URL
     ?(import.meta.env.VITE_BACKEND_URL + "/api/superadminenquiry") 
     : "/api/superadminenquiry",
    credentials: "include",
  }),

  tagTypes: ["SuperAdminEnquiry"],

  endpoints: (builder) => ({

    /* 🌍 PUBLIC — Submit Enquiry */
    createSuperAdminEnquiry: builder.mutation({
      query: (data) => ({
        url: "/public",
        method: "POST",
        body: data,
      }),
    }),

    /* 🔐 SuperAdmin — Fetch All */
    getSuperAdminEnquiries: builder.query({
      query: () => "/",
      providesTags: ["SuperAdminEnquiry"],
    }),

    /* 📝 Update Status */
    updateSuperAdminEnquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["SuperAdminEnquiry"],
    }),

    /* 🗑 Delete */
    deleteSuperAdminEnquiry: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperAdminEnquiry"],
    }),
  }),
});

export const {
  useCreateSuperAdminEnquiryMutation,
  useGetSuperAdminEnquiriesQuery,
  useUpdateSuperAdminEnquiryStatusMutation,
  useDeleteSuperAdminEnquiryMutation,
} = superAdminEnquiryApi;
