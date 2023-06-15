import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api/",
  }),
  keepUnusedDataFor: 900, //15min
  tagTypes: ["Post", "User", "Conversation", "Notification", "Question"],
  endpoints: (builder) => ({}),
});
