import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superAdminContactApi = createApi({
  reducerPath: "superAdminContactApi",

  baseQuery: fetchBaseQuery({
           baseUrl: import.meta.env.VITE_BACKEND_URL
     ?(import.meta.env.VITE_BACKEND_URL + "/api/superadmincontact") 
     : "/api/superadmincontact",
    credentials: "include", 
    
  }),

  tagTypes: ["SuperAdminContact"],

  endpoints: (builder) => ({

    /* 🌍 PUBLIC — Create Contact */
    createContact: builder.mutation({
      query: (data) => ({
        url: `/public`,
        method: "POST",
        body: data,  // { name, email, phone, service, message, superAdminId }
      }),
      invalidatesTags: ["SuperAdminContact"],
    }),

    /* 🔐 SUPERADMIN — Get All Contacts */
    getDashboardContacts: builder.query({
      query: () => `/`,
      providesTags: ["SuperAdminContact"],
    }),

    /* 🔐 SUPERADMIN — Update Status */
    updateContactStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["SuperAdminContact"],
    }),

    /* 🔐 SUPERADMIN — Delete Contact */
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperAdminContact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetDashboardContactsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = superAdminContactApi;
