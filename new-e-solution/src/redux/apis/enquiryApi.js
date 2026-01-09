
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enquiryApi = createApi({
  reducerPath: "enquiryApi",

  baseQuery: fetchBaseQuery({

      baseUrl: import.meta.env.VITE_BACKEND_URL
          ?(import.meta.env.VITE_BACKEND_URL + "/api/enquiry") 
          : "/api/enquiry",
    credentials: "include",

    prepareHeaders: (headers, { getState, endpoint }) => {
      const noAuthNeeded = ["createEnquiry"];

      // 🚫 User enquiry needs NO token
      if (noAuthNeeded.includes(endpoint)) {
        return headers;
      }

      // ✅ Admin routes require token
      const token = getState().admin.admin?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Enquiry"],

  endpoints: (builder) => ({

    /* ------------------------------------------
       📨 USER → Create Enquiry (NO TOKEN REQUIRED)
    -------------------------------------------*/
    createEnquiry: builder.mutation({
      query: (data) => ({
        url: "/",            // ⭐ FIXED — correct URL
        method: "POST",
        body: data,          // ⭐ Contains name, email, message, productId
      }),
    }),

    /* ------------------------------------------
       📋 ADMIN → Get All Enquiries
    -------------------------------------------*/
    getAllEnquiries: builder.query({
      query: () => "/",
      providesTags: ["Enquiry"],
    }),

    /* ------------------------------------------
       👤 USER → Get My Enquiries
    -------------------------------------------*/
    getMyEnquiries: builder.query({
      query: () => "/my",
      providesTags: ["Enquiry"],
    }),

    /* ------------------------------------------
       🧾 ADMIN → Update Enquiry Status
    -------------------------------------------*/
    updateEnquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Enquiry"],
    }),

    /* ------------------------------------------
       ❌ ADMIN → Delete Enquiry
    -------------------------------------------*/
    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useGetAllEnquiriesQuery,
  useGetMyEnquiriesQuery,
  useUpdateEnquiryStatusMutation,
  useDeleteEnquiryMutation,
} = enquiryApi;
