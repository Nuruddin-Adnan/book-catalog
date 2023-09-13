import { api } from "../../api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlists",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlists"],
    }),
    myWishlist: builder.query({
      query: () => `/wishlists/my-wishlists`,
      providesTags: ["wishlists"],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/genres/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlists"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useMyWishlistQuery,
  useDeleteWishlistMutation,
} = wishlistApi;
