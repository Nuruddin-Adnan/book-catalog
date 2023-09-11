import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyBooks: builder.query({
      query: () => `/books/my-books`,
      providesTags: ["books"],
    }),
    getShowToAllbooks: builder.query({
      query: () => `/books/show-to-all`,
      providesTags: ["books"],
    }),
    getSinglebook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),
    createbook: builder.mutation({
      query: (data) => ({
        url: "/books/create-book",
        method: "POST",
        body: data,
      }),
    }),
    updatebook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetMyBooksQuery,
  useGetSinglebookQuery,
  useCreatebookMutation,
  useGetShowToAllbooksQuery,
  useUpdatebookMutation,
} = bookApi;
