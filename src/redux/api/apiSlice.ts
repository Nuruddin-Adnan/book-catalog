import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      // Get the access token from sessionStorage
      const authData = sessionStorage.getItem("authData");
      if (authData) {
        const token = JSON.parse(authData).accessToken;
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["registrations"],
  endpoints: () => ({}),
});
