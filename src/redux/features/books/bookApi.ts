import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
    }),
    getBooks: builder.query({
      query: (query) => `/books?${query}`,
      providesTags: ["books"],
    }),
  }),
});

export const { useCreateBookMutation, useGetBooksQuery } = bookApi;
