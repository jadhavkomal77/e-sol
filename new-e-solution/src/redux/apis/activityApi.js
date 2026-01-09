import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
  reducerPath: "activityApi",

  baseQuery: fetchBaseQuery({

     baseUrl: (import.meta.env.VITE_BACKEND_URL + "/api/logs") || "/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => "/",
    }),

    clearLogs: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetLogsQuery, useClearLogsMutation } = activityApi;
