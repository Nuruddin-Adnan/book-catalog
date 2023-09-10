import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admins/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useAdminLoginMutation, useSignupMutation } =
  authApi;
