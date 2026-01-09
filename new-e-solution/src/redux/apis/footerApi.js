
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const footerApi = createApi({
  reducerPath: "footerApi",

  baseQuery: fetchBaseQuery({  
     baseUrl: import.meta.env.VITE_BACKEND_URL
          ?(import.meta.env.VITE_BACKEND_URL + "/api/footer") 
          : "/api/footer",
    credentials: "include",
  }),

  tagTypes: ["Footer"],

  endpoints: (builder) => ({

    /* =========================
       🔐 ADMIN PANEL
    ========================= */

    // 🔹 Load footer inside Admin Panel (logged-in admin)
    getFooter: builder.query({
      query: () => "/",
      providesTags: ["Footer"],
    }),

    // 🔹 Update footer from Admin Panel
    updateFooter: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Footer"],
    }),

    
    getPublicFooter: builder.query({
       query: (slug) => `/public/${slug}`,
     }),

  }),
});

export const {
  useGetFooterQuery,
  useUpdateFooterMutation,
  useGetPublicFooterQuery,
} = footerApi;
