import { api } from "../../api/apiSlice";

const myReadingListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMyReadinglist: builder.mutation({
      query: (data) => ({
        url: "/my-reading-lists",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["my-reading-lists"],
    }),
    getMyReadinglists: builder.query({
      query: () => `/my-reading-lists/my-reading-lists`,
      providesTags: ["my-reading-lists"],
    }),
    updateMyReadinglist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/my-reading-lists/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["my-reading-lists"],
    }),
    deleteMyReadinglist: builder.mutation({
      query: (id) => ({
        url: `/my-reading-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["my-reading-lists"],
    }),
  }),
});

export const {
  useCreateMyReadinglistMutation,
  useGetMyReadinglistsQuery,
  useUpdateMyReadinglistMutation,
  useDeleteMyReadinglistMutation,
} = myReadingListApi;
