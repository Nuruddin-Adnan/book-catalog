import { api } from "../../api/apiSlice";

const genreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (data) => ({
        url: "/genres",
        method: "POST",
        body: data,
      }),
    }),
    getGenres: builder.query({
      query: (query) => `/genres?${query}`,
      providesTags: ["books"],
    }),
  }),
});

export const { useCreateGenreMutation, useGetGenresQuery } = genreApi;
