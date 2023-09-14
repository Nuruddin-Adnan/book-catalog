import { api } from "../../api/apiSlice";

const genreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (data) => ({
        url: "/genres",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["genres"],
    }),
    getAllGenres: builder.query({
      query: (query) => `/genres?${query}`,
      providesTags: ["genres"],
    }),
  }),
});

export const { useCreateGenreMutation, useGetAllGenresQuery } = genreApi;
