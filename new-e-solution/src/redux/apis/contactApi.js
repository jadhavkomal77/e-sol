

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",

  baseQuery: fetchBaseQuery({
     baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/contact" || "/api",
    credentials: "include",
  }),

  tagTypes: ["Contact"],

  endpoints: (builder) => ({

    // USER — CREATE CONTACT
   createContact: builder.mutation({
  query: ({ slug, ...data }) => ({
    // ⭐ slug URL मध्ये
    url: `/public/${slug}`,
    method: "POST",
    body: data, // { name, email, phone, service, message }
  }),
  invalidatesTags: ["Contact"],
}),


    // ADMIN — GET ALL CONTACTS
    getAllContacts: builder.query({
      query: () => "/",
      transformResponse: (res) => res.contacts,
      providesTags: ["Contact"],
      refetchOnMountOrArgChange: true,
    }),

    // ADMIN — DELETE CONTACT
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),

  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useDeleteContactMutation,
} = contactApi;
